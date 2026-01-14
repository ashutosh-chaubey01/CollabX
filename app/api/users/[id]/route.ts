import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { profileUpdateSchema } from "@/lib/validators";
import { requireRequestUser } from "@/lib/auth";
import { ZodError } from "zod";

type RouteContext = {
  params: { id: string };
};

export async function GET(req: NextRequest, { params }: RouteContext) {
  try {
    await connectToDatabase();
    const auth = await requireRequestUser(req);

    if (auth.payload.userId !== params.id && auth.payload.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const user = await User.findById(params.id).select("-passwordHash -__v");
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    if ((error as Error).message === "Unauthorized request") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  try {
    await connectToDatabase();
    const auth = await requireRequestUser(req);

    if (auth.payload.userId !== params.id && auth.payload.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const data = profileUpdateSchema.parse(body);

    const updated = await User.findByIdAndUpdate(
      params.id,
      { $set: data },
      { new: true, runValidators: true, select: "-passwordHash -__v" }
    );

    if (!updated) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user: updated }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: "Invalid payload", issues: error.issues },
        { status: 422 }
      );
    }

    if ((error as Error).message === "Unauthorized request") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}

