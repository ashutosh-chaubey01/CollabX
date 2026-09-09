import { connectToDatabase } from "@/lib/db";
import Hackathon from "@/models/Hackathon";
import { NextResponse } from "next/server";

// GET all hackathons
export async function GET() {
  await connectToDatabase();
  const hacks = await Hackathon.find();
  return NextResponse.json(hacks);
}

// CREATE hackathon
export async function POST(req: Request) {
  await connectToDatabase();

  const body = await req.json();
  const newHack = await Hackathon.create(body);

  return NextResponse.json(newHack);
}