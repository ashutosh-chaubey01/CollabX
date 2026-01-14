import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    domain: { type: String, required: true },
    membersNeeded: { type: Number, required: true },
    description: { type: String, required: true },
    authorEmail: { type: String, required: true },
    authorName: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);