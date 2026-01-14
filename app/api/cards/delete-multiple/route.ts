import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Card from "@/models/Card";
import { requireRequestUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const auth = await requireRequestUser(req);

    const body = await req.json();
    const latestId = body.latestId;

    if (!latestId) {
      return NextResponse.json({ message: "Missing latestId" }, { status: 400 });
    }

    await Card.deleteMany({
      userId: auth.user._id,
      _id: { $ne: latestId },
    });

    return NextResponse.json({ success: true }, { status: 200 });
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
