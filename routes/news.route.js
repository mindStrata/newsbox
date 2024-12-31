import express from "express";
import OpenGraphScraper from "open-graph-scraper";
const router = express.Router();
import { Newsobject } from "../test.js";

router.get("/home", async (req, res, next) => {
  res.render("home", { Newsobject });
});

router.post("/new-news", async (req, res, next) => {
  const url = req.body.url;
  if (!url) {
    return res.status(400).send("URL is required");
  }

  try {
    const { result } = await OpenGraphScraper({ url });
    const data = result.jsonLD[0];
    /*  console.log({
      publisher: result.jsonLD[0].publisher,
      publishedDate: result.jsonLD[0].datePublished,
      title: result.ogTitle,
      Image: result.ogImage,
      Descriptione: result.ogDescription,
      URL: result.ogUrl,
      SiteName: result.ogSiteName,
      tags: result.ogArticleTag,
    }); */
    res.render("home", { Newsobject });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error scraping OpenGraph data");
  }
});

export default router;
