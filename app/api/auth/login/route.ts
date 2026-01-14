import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { loginSchema } from "@/lib/validators";
import { signAuthToken, setAuthCookie } from "@/lib/auth";
import { generateUserSlug } from "@/lib/slug";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const data = loginSchema.parse(body);

    const user = await User.findOne({ email: data.email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isValid = await bcrypt.compare(data.password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    if (!user.slug) {
      const slug = await generateUserSlug(user.fullName, async (candidate) => {
        const existing = await User.exists({ slug: candidate });
        return Boolean(existing);
      });
      user.slug = slug;
      await user.save();
    }

    const token = signAuthToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

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
      { status: 200 }
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

