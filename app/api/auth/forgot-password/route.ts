import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { connectToDatabase } from "@/lib/db";
import { createPasswordResetToken, sendPasswordResetEmail } from "@/lib/password-reset";
import { forgotPasswordSchema } from "@/lib/validators";
import User from "@/models/User";

const SUCCESS_MESSAGE = "If an account exists for that email, a password reset link has been sent.";

export async function POST(request: Request) {
  try {
    const data = forgotPasswordSchema.parse(await request.json());
    await connectToDatabase();

    const user = await User.findOne({ email: data.email }).select(
      "+passwordResetTokenHash +passwordResetExpiresAt"
    );

    if (user) {
      const { token, tokenHash, expiresAt } = createPasswordResetToken();
      user.passwordResetTokenHash = tokenHash;
      user.passwordResetExpiresAt = expiresAt;
      await user.save();

      const configuredUrl = process.env.NEXT_PUBLIC_APP_URL;
      const appUrl = configuredUrl || new URL(request.url).origin;
      const resetUrl = `${appUrl.replace(/\/$/, "")}/reset-password?token=${token}`;
      await sendPasswordResetEmail({ to: user.email, resetUrl });
    }

    return NextResponse.json({ message: SUCCESS_MESSAGE });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: "Enter a valid email address." },
        { status: 422 }
      );
    }

    console.error("Password reset request failed", error);
    return NextResponse.json(
      { message: "Unable to send a password reset email. Please try again." },
      { status: 500 }
    );
  }
}
