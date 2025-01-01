import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: { type: String },
    image: { type: String },
    siteName: { type: String },
    description: { type: String },
    link: { type: String },
    source: { type: String },
  },
  { timestamps: true }
);

export const NewsItem =
  mongoose.models.Link || mongoose.model("News", newsSchema);
