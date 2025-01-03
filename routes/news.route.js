import express from "express";
import OpenGraphScraper from "open-graph-scraper";
import { NewsItem } from "../models/news.model.js";
import config from "../config/config.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.get("/home", isAuthenticated, async (req, res, next) => {
  try {
    const items = await NewsItem.find({user: req.user._id})
    // const newsItem = await NewsItem.find().sort({ createdAt: -1 });
    /*  console.log(newsItem); */
    let user = "Mind Strata";
    res.render("home", { newsItem: items, appURL: config.Server_URL, user: req.user.name , config});
  } catch (error) {
    console.error("Error rendering home page:", error);
    res.status(500).send("Error rendering home page.");
  }
});

router.post("/new-news", async (req, res, next) => {
  const url = req.body.url;
  console.log(url);

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
    });

    await newNews.save();

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
});

export default router;
