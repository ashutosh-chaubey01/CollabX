import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Types } from "mongoose";
import Friend from "@/models/Friend";
import { requireRequestUser } from "@/lib/auth";

/**
 * Debug endpoint to test Friend model directly
 * POST /api/debug/friends-test
 * This endpoint bypasses all validation to test basic Friend.create() functionality
 */
export async function POST(req: NextRequest) {
  try {
    console.log("\n========== FRIENDS TEST DEBUG ==========");
    console.log("[TEST] Step 1: Connecting to database...");
    await connectToDatabase();
    console.log("[TEST] ✅ Database connected");

    console.log("[TEST] Step 2: Getting auth...");
    const auth = await requireRequestUser(req);
    console.log("[TEST] ✅ Auth verified for user:", auth.user._id);

    const body = await req.json();
    const testFriendId = body.testFriendId || "676b2f9e8e0c1a2b3c4d5e6f"; // Dummy ID

    console.log("[TEST] Step 3: Checking Friend model...");
    console.log("[TEST] Friend model:", Friend);
    console.log("[TEST] Friend.schema:", Friend.schema);
    console.log("[TEST] Friend.collection:", Friend.collection);

    const userId = new Types.ObjectId(auth.user._id);
    const friendId = new Types.ObjectId(testFriendId);

    console.log("[TEST] Step 4: Creating Friend document...");
    console.log(`[TEST] userId: ${userId} (type: ${typeof userId})`);
    console.log(`[TEST] friendId: ${friendId} (type: ${typeof friendId})`);

    const result = await Friend.create({
      userId,
      friendId,
    });

    console.log("[TEST] ✅ Friend.create() succeeded!");
    console.log("[TEST] Result:", JSON.stringify(result, null, 2));

    // Verify it was actually saved by reading it back
    console.log("[TEST] Step 5: Reading back from database...");
    const verified = await Friend.findById(result._id);
    console.log("[TEST] ✅ Verification read succeeded!");
    console.log("[TEST] Verified result:", JSON.stringify(verified, null, 2));

    return NextResponse.json(
      {
        message: "✅ Test successful!",
        created: result,
        verified: verified,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[TEST] ❌ Error occurred:");
    console.error("[TEST] Error type:", error instanceof Error ? error.constructor.name : typeof error);
    console.error("[TEST] Error message:", (error as Error).message);
    console.error("[TEST] Full error:", error);
    console.log("==========================================\n");

    return NextResponse.json(
      {
        message: "❌ Test failed",
        error: (error as Error).message,
        errorType: error instanceof Error ? error.constructor.name : typeof error,
      },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint to check all Friend documents in database
 */
export async function GET(req: NextRequest) {
  try {
    console.log("\n========== FRIENDS TEST DEBUG GET ==========");
    console.log("[TEST GET] Connecting to database...");
    await connectToDatabase();
    console.log("[TEST GET] ✅ Database connected");

    console.log("[TEST GET] Getting auth...");
    await requireRequestUser(req);
    console.log("[TEST GET] ✅ Auth verified");

    console.log("[TEST GET] Checking Friend collection...");
    const count = await Friend.countDocuments();
    console.log(`[TEST GET] ✅ Friend collection has ${count} documents`);

    const allFriends = await Friend.find().lean();
    console.log("[TEST GET] All Friend documents:");
    console.log(JSON.stringify(allFriends, null, 2));

    console.log("===========================================\n");

    return NextResponse.json(
      {
        message: `Found ${count} Friend documents`,
        count,
        friends: allFriends,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[TEST GET] ❌ Error:", (error as Error).message);
    return NextResponse.json(
      {
        message: "Error",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
