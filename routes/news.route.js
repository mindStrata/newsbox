import express from "express";
import {
  addNewsItems,
  exportNewsArticleData,
  getRecentNewsItems,
  showHomeRoute,
} from "../controller/news.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { NewsItem } from "../models/news.model.js";

const router = express.Router();

router.get("/home", isAuthenticated, showHomeRoute);

router.get("/api/news", isAuthenticated, getRecentNewsItems);

router.post("/new-news", isAuthenticated, addNewsItems);

/* router.get("/news-title", async (req, res, next) => {
  try {
    const sources = await NewsItem.distinct("source", {
      user: req.user._id,
    });

    res.json({ sources });
  } catch (error) {
    next(error);
  }
}); */

router.get("/export-csv", isAuthenticated, exportNewsArticleData);

export default router;
