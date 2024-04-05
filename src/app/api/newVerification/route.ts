import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { token } = body;

  console.log(token);

  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return NextResponse.json({ error: 'Token does not exist!' });
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return NextResponse.json({ error: 'Token has expired' });
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return NextResponse.json({ error: 'Email not found' });
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email
    },
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return NextResponse.json({ success: 'Email verified!' });
}
