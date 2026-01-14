import { NextRequest, NextResponse } from "next/server";
import { requireRequestUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const auth = await requireRequestUser(request);

    const { user } = auth;
    return NextResponse.json(
      {
        user: {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          jobTitle: user.jobTitle,
          slug: user.slug,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 401 }
    );
  }
}

