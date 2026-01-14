import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Types } from "mongoose";
import User from "@/models/User";
import Friend from "@/models/Friend";
import { requireRequestUser } from "@/lib/auth";
import { ZodError, z } from "zod";

const addFriendSchema = z.object({
  friendId: z.string().min(1),
});

type FriendData = {
  _id: Types.ObjectId | string;
  fullName?: string;
  jobTitle?: string;
  slug?: string;
  avatarUrl?: string;
  bio?: string;
};

type FriendshipDoc = {
  friendId: FriendData;
};

export async function GET(req: NextRequest) {
  try {
    console.log("[Friends API GET] Starting GET request");
    await connectToDatabase();
    console.log("[Friends API GET] Database connected");
    
    const auth = await requireRequestUser(req);
    console.log("[Friends API GET] Auth verified for user:", auth.user._id);

    // Query Friend schema to get all friendships where userId is the current user
    console.log(
      `[Friends API GET] Querying Friend collection for userId=${auth.user._id}`
    );
    const friendships = await Friend.find({ userId: auth.user._id })
      .populate({
        path: "friendId",
        select: "fullName jobTitle slug avatarUrl bio",
      })
      .lean();

    console.log(
      `[Friends API GET] Found ${friendships.length} friendships in database`
    );
    if (friendships.length > 0) {
      console.log("[Friends API GET] Sample friendship:", friendships[0]);
    }

    // Extract friend data from the populated friendId field
    const friends = friendships
      .map((f: FriendshipDoc) => f.friendId)
      .filter((f: FriendData | null) => f !== null) as FriendData[];

    console.log(
      `[Friends API GET] User ${auth.user._id} retrieved ${friends.length} friends`
    );
    friends.forEach((f) => {
      console.log(
        `  - Friend: ${f.fullName} (${f.slug}), avatarUrl: ${f.avatarUrl}`
      );
    });

    return NextResponse.json(
      {
        friends: friends.map((friend) => ({
          _id: friend._id,
          fullName: friend.fullName,
          jobTitle: friend.jobTitle,
          slug: friend.slug,
          avatarUrl: friend.avatarUrl,
          bio: friend.bio,
        })),
      },
      { status: 200 }
    );
  } catch (error) {
    if ((error as Error).message === "Unauthorized request") {
      console.error("[Friends API GET] Unauthorized");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const errorMessage = (error as Error).message || "Unknown error";
    console.error("[Friends API GET] Error:", errorMessage);
    return NextResponse.json(
      { message: errorMessage },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log("[Friends API POST] Starting POST request");
    await connectToDatabase();
    console.log("[Friends API POST] Database connected");
    
    const auth = await requireRequestUser(req);
    console.log("[Friends API POST] Auth verified for user:", auth.user._id);
    
    const body = await req.json();
    console.log("[Friends API POST] Request body:", body);
    
    const data = addFriendSchema.parse(body);
    console.log("[Friends API POST] Schema validation passed, friendId:", data.friendId);

    // Check if trying to add self
    const currentUserId = auth.user._id.toString();
    if (data.friendId === currentUserId) {
      console.log(`[Friends API POST] Attempt to add self - rejected`);
      return NextResponse.json(
        { message: "You cannot add yourself as a friend" },
        { status: 400 }
      );
    }

    // Verify the friend exists
    console.log(`[Friends API POST] Verifying friend exists: ${data.friendId}`);
    const friend = await User.findById(data.friendId);
    if (!friend) {
      console.log(`[Friends API POST] Friend not found: ${data.friendId}`);
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    console.log("[Friends API POST] Friend verified:", friend.fullName);

    // Create friendship entry in Friend schema (current user adding friend)
    console.log(
      `[Friends API POST] Creating first friendship: userId=${currentUserId}, friendId=${data.friendId}`
    );
    const currentUserFriendship = await Friend.create({
      userId: new Types.ObjectId(currentUserId),
      friendId: new Types.ObjectId(data.friendId),
    });
    console.log(
      `[Friends API POST] ✅ Friendship 1 saved with ID:`,
      currentUserFriendship._id
    );

    // Create reciprocal friendship entry (friend getting added back)
    console.log(
      `[Friends API POST] Creating reciprocal friendship: userId=${data.friendId}, friendId=${currentUserId}`
    );
    const reciprocalFriendship = await Friend.create({
      userId: new Types.ObjectId(data.friendId),
      friendId: new Types.ObjectId(currentUserId),
    });
    console.log(
      `[Friends API POST] ✅ Friendship 2 saved with ID:`,
      reciprocalFriendship._id
    );

    // Verify the documents were actually saved
    console.log("[Friends API POST] Verifying data was saved to database...");
    const verify1 = await Friend.findById(currentUserFriendship._id);
    const verify2 = await Friend.findById(reciprocalFriendship._id);
    console.log("[Friends API POST] ✅ Verification 1 - document exists:", !!verify1);
    console.log("[Friends API POST] ✅ Verification 2 - document exists:", !!verify2);

    return NextResponse.json(
      {
        message: "Friend added successfully",
        friendshipIds: [currentUserFriendship._id, reciprocalFriendship._id],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Friends API POST] Error caught:", error);
    
    if (error instanceof ZodError) {
      console.error("[Friends API POST] Zod validation error:", error.issues);
      return NextResponse.json(
        { message: "Invalid payload", issues: error.issues },
        { status: 422 }
      );
    }
    if ((error as Error).message === "Unauthorized request") {
      console.error("[Friends API POST] Unauthorized");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    
    // Handle MongoDB duplicate key error
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: number }).code === 11000
    ) {
      console.warn("[Friends API POST] Duplicate friendship already exists");
      return NextResponse.json(
        { message: "Friendship already exists" },
        { status: 409 }
      );
    }

    const errorMessage = (error as Error).message || "Unknown error";
    console.error("[Friends API POST] Final error message:", errorMessage);
    console.error("[Friends API POST] Full error stack:", (error as Error).stack);
    return NextResponse.json(
      { message: errorMessage },
      { status: 500 }
    );
  }
}

