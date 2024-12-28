const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  source: { type: String, required: true },
  link: { type: String, required: true },
});

export const News = mongoose.models.Link || mongoose.model("News", newsSchema);
