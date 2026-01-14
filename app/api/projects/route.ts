import { connectToDatabase } from "@/lib/db";
import Project from "@/models/Projects";
import { NextResponse } from "next/server";

/* ======================
   GET → Fetch all projects
====================== */
export async function GET() {
  await connectToDatabase();
  const projects = await Project.find().sort({ createdAt: -1 });
  return NextResponse.json(projects);
}

/* ======================
   POST → Create project
====================== */
export async function POST(req: Request) {
  const body = await req.json();

  await connectToDatabase();

  const project = await Project.create({
    name: body.name,
    domain: body.domain,
    membersNeeded: body.membersNeeded,
    description: body.description,
    authorEmail: body.authorEmail,
    authorName: body.authorName,
  });

  return NextResponse.json(project, { status: 201 });
}
