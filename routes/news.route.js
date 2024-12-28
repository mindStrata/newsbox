import express from "express";
import OpenGraphScraper from "open-graph-scraper";
const router = express.Router();

router.get("/home", async (req, res, next) => {
  res.send("home");
});

router.post("/new-news", async (req, res, next) => {
  const url = req.body.url;
  if (!url) {
    return res.status(400).send("URL is required");
  }

  try {
    // Use OpenGraph scraper
    const { result } = await OpenGraphScraper({ url });
    const { ogTitle, ogImage, ogUrl, ogSiteName } = result;

    // Send the OpenGraph title back in the response
    console.log({ ogData: { ogTitle, ogImage, ogUrl, ogSiteName } });
    res.render("index", { ogData: { ogTitle, ogImage, ogUrl, ogSiteName } });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error scraping OpenGraph data");
  }
});

export default router;
