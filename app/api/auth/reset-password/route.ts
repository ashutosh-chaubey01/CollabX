import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { connectToDatabase } from "@/lib/db";
import { hashPasswordResetToken } from "@/lib/password-reset";
import { resetPasswordSchema } from "@/lib/validators";
import User from "@/models/User";

export async function POST(request: Request) {
  try {
    const data = resetPasswordSchema.parse(await request.json());
    await connectToDatabase();

    const user = await User.findOne({
      passwordResetTokenHash: hashPasswordResetToken(data.token),
      passwordResetExpiresAt: { $gt: new Date() },
    }).select("+passwordResetTokenHash +passwordResetExpiresAt");

    if (!user) {
      return NextResponse.json(
        { message: "This password reset link is invalid or has expired." },
        { status: 400 }
      );
    }

    user.passwordHash = await bcrypt.hash(data.password, 10);
    user.passwordResetTokenHash = undefined;
    user.passwordResetExpiresAt = undefined;
    await user.save();

    return NextResponse.json({ message: "Your password has been reset. You can now sign in." });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters." },
        { status: 422 }
      );
    }

    console.error("Password reset failed", error);
    return NextResponse.json(
      { message: "Unable to reset password. Please try again." },
      { status: 500 }
    );
  }
}
