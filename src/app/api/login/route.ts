import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  const validatedFields = LoginSchema.safeParse({ email, password });

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return NextResponse.json({ error: "Email does not exist!" });
  }

  if (!validatedFields.success) {
    return NextResponse.json({ error: 'Invalid input' });
  }

  try {
    await signIn("credentials", {
      email: validatedFields.data.email,
      password: validatedFields.data.password,

      redirect: false
    })

    console.log('Sign in successful!');
    return NextResponse.json({ success: 'Sign in successful!' });
    // return NextResponse.redirect('/');

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin': return NextResponse.json({ error: 'Invalid credentials!' });
        default: return NextResponse.json({ error: 'An error has occurred!' });
      }
    }
    throw error;
  }
}