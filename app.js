///////////////////////////////////////////////////////
////                  SERVER.NEWSBOX               ////
///////////////////////////////////////////////////////

/**
 * @author Mind Strata (https://github.com/mindstrata)
 *
 * @module app
 * @file This file is the entry point of this express.js server
 * @description This particular file starts the server and configures the other integrations e.g., routing, middleware and errorHandler etc.
 */

import cookieParser from "cookie-parser";
import express from "express";
import createHttpError from "http-errors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import config from "./config/config.js";
import connectDatabase from "./config/db.js";
import AuthRouter from "./routes/auth.route.js";
import NewsRouter from "./routes/news.route.js";
import errorMiddleware from "./utils/errorMiddleware.js";

// Get the directory name (__dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create an express.js app
const app = express();
const port = config.port;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from the "public" directory
app.use(morgan("dev"));
app.use(cookieParser(config.jwtSecret));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", NewsRouter);
app.use("/", AuthRouter);

// Home or base route
app.get("/", async (req, res, next) => {
  res.redirect("/login");
  // res.render("index", { ogData: null });
});

app.all("*", async (req, res, next) => {
  /**
   * @method GET
   * @return {next}
   * @description Based on request method provides different error message e.g, for GET "Page not found" and for other methods (POST, PUT, PATCH, DELETED) return "Rote not found".
   * */
  if (req.method === "GET") {
    next(createHttpError.NotFound("Page not found"));
  } else {
    next(createHttpError.NotFound("Rote not found"));
  }
});

app.use(errorMiddleware);

// Start the server
/* app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); */

connectDatabase()
  .then((res) => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
      console.log(res);
    });
  })
  .catch((err) => {
    console.log(`Error occured to run the server ${err}`);
    process.exit(1);
  });
