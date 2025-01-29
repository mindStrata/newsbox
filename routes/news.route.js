import express from "express";
import {
  addNewsItems,
  exportNewsArticleData,
  filterNewsBySource,
  getRecentNewsItems,
  showHomeRoute,
} from "../controller/news.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.get("/home", isAuthenticated, showHomeRoute);

router.get("/api/news", isAuthenticated, getRecentNewsItems);

router.post("/new-news", isAuthenticated, addNewsItems);

router.get("/news-source", isAuthenticated, filterNewsBySource);

router.get("/export-csv", isAuthenticated, exportNewsArticleData);

export default router;
