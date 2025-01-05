import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { User } from "../models/user.model.js";

/* GET METHOD */
export const LoginUserGET = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.render("login", { toast: null, api: config.Server_URL }); // No token, redirect to login
    }

    // Verify the token
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        // Invalid token, redirect to login
        return res.render("login", { toast: null });
      }

      // Token is valid, redirect to home
      return res.redirect("/home");
    });
  } catch (error) {
    // console.error("Error during login process:", error);
    return next(error); // Pass the error to the middleware
  }
};

/* POST METHOD */
export const LoginUserPOST = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(createHttpError.NotFound());
    if (!user.password)
      return next(createHttpError(500, "Something went wrong..."));

    const isMatched = user.password === password;

    if (!isMatched) return next(createHttpError(401, "Invalid credentials"));

    const token = jwt.sign({ _id: user._id }, config.jwtSecret, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: config.SERVER_ENVIRONMENT === "production" ? true : false,
      maxAge: 60 * 60 * 1000, // One hour
    });

    // Render login with a toast
    res.render("login", {
      toast: { type: "success", message: "Login successful!" },
      api: config.Server_URL,
    });
  } catch (error) {
    return next(error);
  }
};

export const registerUserPOST = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;

    // Validate required fields
    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newUser = new User({
      name,
      username,
      email,
      password,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    res.status(201).json({
      message: "User registered successfully.",
      user: {
        id: savedUser._id,
        name: savedUser.name,
        username: savedUser.username,
        email: savedUser.email,
        role: savedUser.role,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true, // Recommended for security
    secure: process.env.NODE_ENV === "production", // Ensure it's secure in production
    sameSite: "strict", // Prevent CSRF attacks
  });

  // Redirect to the login page
  return res.redirect("/login");
};
