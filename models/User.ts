import { Schema, model, models, HydratedDocument } from "mongoose";

export interface UserSchema {
  fullName: string;
  email: string;
  passwordHash: string;
  role: "user" | "admin";
  slug: string;
  jobTitle?: string;
  bio?: string;
  headline?: string;
  websiteUrl?: string;
  avatarUrl?: string;
  phone?: string;
  location?: {
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  };
  socials?: {
    linkedin?: string;
    twitter?: string;
    personal?: string;
    instagram?: string;
  };
  cardPreferences?: {
    defaultTemplateId?: number;
  };
}

const userSchema = new Schema<UserSchema>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    slug: { type: String, required: true, unique: true, index: true },
    jobTitle: { type: String },
    bio: { type: String },
    headline: { type: String },
    websiteUrl: { type: String },
    avatarUrl: { type: String },
    phone: { type: String },
    location: {
      city: { type: String },
      state: { type: String },
      country: { type: String },
      postalCode: { type: String },
    },
    socials: {
      linkedin: { type: String },
      twitter: { type: String },
      personal: { type: String },
      instagram: { type: String },
    },
    cardPreferences: {
      defaultTemplateId: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

const User = models.User || model<UserSchema>("User", userSchema);

export type UserDocument = HydratedDocument<UserSchema>;

export default User;

