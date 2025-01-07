import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: { type: String },
    image: { type: String },
    siteName: { type: String },
    description: { type: String },
    link: {
      type: String,
      required: true,
    },
    source: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId, // Reference to User model
      ref: "User",
      required: true, // User is required
    },
  },
  { timestamps: true }
);

export const NewsItem =
  mongoose.models.Link || mongoose.model("News", newsSchema);
