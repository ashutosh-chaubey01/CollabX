import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Card from "@/models/Card";
import User from "@/models/User";

type RouteContext = {
  params: Promise<{ userId: string }>;
};

export async function GET(req: NextRequest, { params }: RouteContext) {
  try {
    await connectToDatabase();
    const { userId } = await params;

    // Validate userId format (should be a valid MongoDB ObjectId)
    if (!userId || userId.length !== 24) {
      return NextResponse.json(
        { message: "Invalid user ID" },
        { status: 400 }
      );
    }

    // Get user
    const user = await User.findById(userId).lean();
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Get user's preferred template or first available card
    const preferredTemplate = user.cardPreferences?.defaultTemplateId;

    let card;
    if (preferredTemplate !== undefined) {
      card = await Card.findOne({
        userId: userId,
        templateId: preferredTemplate,
      }).lean();
    }

    if (!card) {
      card = await Card.findOne({ userId: userId }).lean();
    }

    if (!card) {
      return NextResponse.json(
        {
          user: {
            _id: user._id.toString(),
            fullName: user.fullName,
            jobTitle: user.jobTitle,
            headline: user.headline,
            bio: user.bio,
          },
          card: null,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        user: {
          _id: user._id.toString(),
          fullName: user.fullName,
          jobTitle: user.jobTitle,
          headline: user.headline,
          bio: user.bio,
          socials: user.socials,
        },
        card: {
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
    console.error("Error fetching user card:", error);
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}

