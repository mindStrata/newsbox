import express from "express";
import { addNewsItems, getRecentNewsItems, showHomeRoute } from "../controller/news.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.get("/home", isAuthenticated, showHomeRoute);

router.get("/api/news", isAuthenticated, getRecentNewsItems);

router.post("/new-news", isAuthenticated, addNewsItems);

export default router;
