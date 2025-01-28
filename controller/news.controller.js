import { format } from "fast-csv";
import createHttpError from "http-errors";
import OpenGraphScraper from "open-graph-scraper";
import path from "path";
import { fileURLToPath } from "url";
import { NewsItem } from "../models/news.model.js";
import { User } from "../models/user.model.js";
import { extractDomain } from "../utils/extractDomain.js";

// Get the directory name (__dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Display the contents of the /home route
export const showHomeRoute = async (req, res, next) => {
  try {
    const items = await NewsItem.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.render("home", {
      newsItem: items,
      user: req.user.name,
      username: req.user.username,
      newsCount: items.length || 0,
    });
  } catch (error) {
    // console.error("Error rendering home page:", error);
    res.status(500).send("Error rendering home page.");
  }
};

// Show the most recently added to the UI
export const getRecentNewsItems = async (req, res) => {
  try {
    const items = await NewsItem.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json({ success: true, newsItem: items });
  } catch (error) {
    // console.error("Error fetching news:", error);
    res.status(500).json({ success: false, message: "Error fetching news." });
  }
};

// Add new news item
export const addNewsItems = async (req, res, next) => {
  const url = req.body.url;

  if (!url) {
    return next(createHttpError.BadRequest("URL is required"));
  }

  try {
    const existingNewsItem = await NewsItem.findOne({
      link: url,
      user: req.user._id,
    });

    if (existingNewsItem) {
      return next(
        createHttpError.Conflict("This link has already been added by you.")
      );
    } else {
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

      // If the link is unique then save it
      const newNews = new NewsItem({
        title: ogTitle,
        image: imageUrl,
        // siteName: ogSiteName,
        description: ogDescription,
        link: ogUrl,
        source: publisherName || ogSiteName || extractDomain(url),
        user: req.user._id,
      });

      await newNews.save();
      await User.findByIdAndUpdate(
        req.user._id,
        { $push: { newsItems: newNews._id }, $inc: { __v: 1 } },
        { new: true }
      );

      res.send({
        success: true,
        error: null,
        message: "Link added",
        description: newNews.title,
      });
    }
  } catch (error) {
    // console.error(
    //   "Error during Open Graph scraping or saving to database:",
    //   error
    // );
    res.status(500).send({
      error: "Failed to scrape Open Graph data or save to the database.",
    });
  }
};

export const exportNewsArticleData = async (req, res, next) => {
  try {
    const news = await NewsItem.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    const user = await User.findById(req.user._id);

    // Set the response headers for file download
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${user.username}-news.csv`
    );
    res.setHeader("Content-Type", "text/csv");

    // Create a CSV stream
    const csvStream = format({ headers: true });
    csvStream.pipe(res); // Pipe to the response object to send data directly to the client

    // Loop through each user and write to the CSV
    news.forEach((news) => {
      csvStream.write({
        ID: news._id,
        Title: news.title,
        Description: news.description,
        Image: news.image,
        URL: news.link,
        Source: news.source,
        // UserID: news.user,
        CreatedAt: news.createdAt,
        UpdatedAt: news.updatedAt,
      });
    });

    // End the stream
    csvStream.end();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating CSV");
  }
};
