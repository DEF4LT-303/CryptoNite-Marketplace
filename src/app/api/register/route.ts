import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password, confirmPassword } = body;

  const validatedFields = RegisterSchema.safeParse({ name, email, password, confirmPassword });

  if (!validatedFields.success) {
    return NextResponse.json({ error: 'Invalid input' });
  }

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return NextResponse.json({ success: "Confirmation email sent!" });
}
