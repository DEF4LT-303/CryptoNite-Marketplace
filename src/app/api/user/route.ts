import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import { ProfileSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const body = await request.json();
  const { name, email, password, newPassword } = body;


  const validatedFields = ProfileSchema.safeParse({ name, email, password, newPassword });
  const user = await currentUser();

  console.log('Server:', user);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" });
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return NextResponse.json({ error: "Unauthorized" });
  }

  // Email update
  if (email !== user.email) {
    const existingUser = await getUserByEmail(email);

    if (existingUser && existingUser.id !== user.id) {
      return NextResponse.json({ error: "Email already exists" });
    }

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return NextResponse.json({ success: "Confirmation email sent!" });
  }

  // Password update
  if (newPassword && password && dbUser.password) {
    const passwordMatch = await bcrypt.compare(password, dbUser.password);

    if (!passwordMatch) {
      return NextResponse.json({ error: "Incorrect password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    body.password = hashedPassword;
    body.newPassword = undefined;

    return NextResponse.json({ success: "Password updated!" });
  }

  await db.user.update({
    where: { id: user.id },
    data: {
      ...body,
    },
  });

  return NextResponse.json({ success: "Profile updated!" });
}