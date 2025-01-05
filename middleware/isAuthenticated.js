import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { User } from "../models/user.model.js";

const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  try {
    if (!token) {
      return res.redirect("/login");
    }

    jwt.verify(token, config.jwtSecret, async (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return next(createHttpError(401, "Token Expired"));
        }

        return res.send(`
          <html>
            <body>
              <h2>Invalid Token</h2>
              <p>Your session has expired or the token is invalid. Please log in again.</p>
              <button onclick="window.location.href='/login'">Go to Login</button>
            </body>
          </html>
        `);
      }

      req.user = await User.findById({ _id: decoded._id });
      return next();
    });
  } catch (error) {
    return next(error);
  }
};

export default isAuthenticated;
