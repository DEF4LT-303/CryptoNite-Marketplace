import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  const validatedFields = LoginSchema.safeParse({ email, password });

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return Response.json({ error: "Email does not exist!" });
  }

  if (!validatedFields.success) {
    return Response.json({ error: 'Invalid input' });
  }

  try {
    await signIn("credentials", {
      email: validatedFields.data.email,
      password: validatedFields.data.password,
      redirectTo: DEFAULT_LOGIN_REDIRECT
    })
    console.log('success');

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin': return Response.json({ error: 'Invalid credentials!' });
        default: return Response.json({ error: 'An error has occurred!' });
      }
    }
    throw error;
  }
}