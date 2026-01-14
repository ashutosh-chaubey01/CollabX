import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { registerSchema } from "@/lib/validators";
import { signAuthToken, setAuthCookie } from "@/lib/auth";
import { ZodError } from "zod";
import { generateUserSlug } from "@/lib/slug";

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const data = registerSchema.parse(body);

    // (OTP verification removed) continue with registration

    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Account already exists with this email" },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(data.password, 10);
    const slug = await generateUserSlug(data.fullName, async (candidate) => {
      const existing = await User.exists({ slug: candidate });
      return Boolean(existing);
    });

    const user = await User.create({
      fullName: data.fullName,
      email: data.email,
      passwordHash,
      jobTitle: data.jobTitle ?? "Member",
      slug,
    });

    const token = signAuthToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    // no OTP cleanup required

    const response = NextResponse.json(
      {
        token,
        user: {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          jobTitle: user.jobTitle,
          role: user.role,
          slug: user.slug,
        },
      },
      { status: 201 }
    );
    setAuthCookie(response, token);
    return response;
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: "Invalid payload", issues: error.issues },
        { status: 422 }
      );
    }

    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}

