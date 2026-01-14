import { Schema, model, models, HydratedDocument, Types } from "mongoose";

export interface CardSchema {
  userId: Types.ObjectId;
  templateId: number;
  frontColors: {
    background: string;
    text: string;
  };
  backColors: {
    background: string;
    text: string;
  };
  links?: {
    linkedin?: string;
    twitter?: string;
    personal?: string;
    instagram?: string;
  };
  headline?: string;
  subHeadline?: string;
}

const cardSchema = new Schema<CardSchema>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    templateId: { type: Number, required: true },
    frontColors: {
      background: { type: String, required: true },
      text: { type: String, required: true },
    },
    backColors: {
      background: { type: String, required: true },
      text: { type: String, required: true },
    },
    links: {
      linkedin: String,
      twitter: String,
      personal: String,
      instagram: String,
    },
    headline: String,
    subHeadline: String,
  },
  { timestamps: true }
);

cardSchema.index({ userId: 1 });

const Card = models.Card || model<CardSchema>("Card", cardSchema);

export type CardDocument = HydratedDocument<CardSchema>;

export default Card;

