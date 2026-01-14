// models/Friend.ts
import { Schema, model, models, HydratedDocument, Types } from "mongoose";

export interface FriendSchema {
  userId: Types.ObjectId; // The user who added the friend
  friendId: Types.ObjectId; // The friend being added
  addedAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const friendSchema = new Schema<FriendSchema>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    friendId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    addedAt: { type: Date, default: Date.now, required: true },
  },
  { timestamps: true } // This adds createdAt and updatedAt automatically
);

// Prevent duplicate friendships
friendSchema.index({ userId: 1, friendId: 1 }, { unique: true });

// Index for querying friends efficiently
friendSchema.index({ userId: 1 });
friendSchema.index({ friendId: 1 });

const Friend = models.Friend || model<FriendSchema>("Friend", friendSchema);

export type FriendDocument = HydratedDocument<FriendSchema>;

export default Friend;