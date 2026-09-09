import mongoose from "mongoose";

const HackathonSchema = new mongoose.Schema({
  title: String,
  domain: String,
  members: Number,
  description: String,
  fullDescription: String,
  date: String,
  location: String,
  applyLink: String,
  image: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Hackathon ||
  mongoose.model("Hackathon", HackathonSchema);