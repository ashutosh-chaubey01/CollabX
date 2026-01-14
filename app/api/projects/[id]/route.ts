import { connectToDatabase } from "@/lib/db";
import Project from "@/models/Projects";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();

  await Project.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
