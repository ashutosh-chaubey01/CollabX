import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { requireRequestUser } from "@/lib/auth";
import Card from "@/models/Card";
import { cardUpsertSchema } from "@/lib/validators";
import { ZodError } from "zod";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const auth = await requireRequestUser(req);

    const { searchParams } = new URL(req.url);
    const templateId = searchParams.get("templateId");

    const query: Record<string, unknown> = { userId: auth.user._id };
    if (templateId !== null) {
      const templateNumber = Number(templateId);
      if (!Number.isNaN(templateNumber)) {
        query.templateId = templateNumber;
      }
    }

    const cards = await Card.find(query);

    return NextResponse.json(
      {
        cards: cards.map((card) => ({
          _id: card._id,
          templateId: card.templateId,
          frontColors: card.frontColors,
          backColors: card.backColors,
          links: card.links,
          headline: card.headline,
          subHeadline: card.subHeadline,
        })),
      },
      { status: 200 }
    );
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

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const auth = await requireRequestUser(req);
    const body = await req.json();
    const data = cardUpsertSchema.parse(body);

    const card = await Card.findOneAndUpdate(
      { userId: auth.user._id, templateId: data.templateId },
      { $set: { ...data, userId: auth.user._id } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    if (!card) {
      throw new Error("Unable to save card");
    }

    return NextResponse.json(
      {
        card: {
          _id: card._id,
          templateId: card.templateId,
          frontColors: card.frontColors,
          backColors: card.backColors,
          links: card.links,
          headline: card.headline,
          subHeadline: card.subHeadline,
        },
      },
      { status: 200 }
    );
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

