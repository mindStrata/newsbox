import OpenGraphScraper from "open-graph-scraper";
import config from "../config/config.js";
import { NewsItem } from "../models/news.model.js";
import { User } from "../models/user.model.js";

export const showHomeRoute = async (req, res, next) => {
  try {
    const items = await NewsItem.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.render("home", {
      newsItem: items,
      base_URL: config.Server_URL,
      user: req.user.name,
      config,
    });
  } catch (error) {
    console.error("Error rendering home page:", error);
    res.status(500).send("Error rendering home page.");
  }
};

export const getRecentNewsItems = async (req, res) => {
  try {
    const items = await NewsItem.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json({ success: true, newsItem: items });
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ success: false, message: "Error fetching news." });
  }
};

export const addNewsItems = async (req, res, next) => {
  const url = req.body.url;

  if (!url) {
    return res.status(400).send("URL is required");
  }

  try {
    const { result } = await OpenGraphScraper({ url });
    const { ogTitle, ogUrl, ogImage, ogDescription, jsonLD, ogSiteName } =
      result;

    let publisherName = null;
    if (Array.isArray(jsonLD) && jsonLD.length > 0 && jsonLD[0].publisher) {
      const publisher = jsonLD[0].publisher;
      if (publisher && publisher.name) {
        publisherName = publisher.name;
      }
    }

    let imageUrl = null;
    if (Array.isArray(ogImage) && ogImage.length > 0 && ogImage[0].url) {
      imageUrl = ogImage[0].url;
    }

    const newNews = new NewsItem({
      title: ogTitle,
      image: imageUrl,
      // siteName: ogSiteName,
      description: ogDescription,
      link: ogUrl,
      source: publisherName || ogSiteName,
      user: req.user._id,
    });

    await newNews.save();
    await User.findByIdAndUpdate(
      req.user._id,
      { $push: { newsItems: newNews._id }, $inc: { __v: 1 } },
      { new: true }
    );

    res.send(newNews);
  } catch (error) {
    console.error(
      "Error during Open Graph scraping or saving to database:",
      error
    );
    res.status(500).send({
      error: "Failed to scrape Open Graph data or save to the database.",
    });
  }
};
