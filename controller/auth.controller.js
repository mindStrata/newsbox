import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { User } from "../models/user.model.js";

/* GET METHOD */
export const LoginUserGET = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    //If there is no token then render the login page
    if (!token) {
      return res.render("login");
    }

    // If the token is invalid then show the login page to reset the all bugs
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        return res.render("login");
      }

      // Token is valid, redirect to home
      return res.redirect("/home");
    });
  } catch (error) {
    return next(error);
  }
};

/* POST METHOD */
export const LoginUserPOST = async (req, res, next) => {
  // Get the email and password
  const { email, password } = req.body;

  try {
    // Find the user
    // const user = await User.findOne({ email }).select("+password");
    const user = await User.findOne({
      $or: [{ email }, { username: email }], // Check both email and username
    }).select("+password");

    if (!user) return next(createHttpError.NotFound("User not registered"));
    if (!user.password)
      return next(createHttpError(500, "Something went wrong..."));
    // Match the password, if not matched then throw error
    const isMatched = await user.comparePassword(password);

    if (!isMatched) return next(createHttpError(401, "Invalid credentials"));

    // If the credentials are correct then generate token and store it to cookies for further authentication
    const token = jwt.sign({ _id: user._id }, config.jwtSecret, {
      expiresIn: "10d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: config.SERVER_ENVIRONMENT === "production" ? true : false,
      maxAge: 10 * 24 * 60 * 60 * 1000, // One hour
    });

    // Render login with a toast
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      error: null,
    });
  } catch (error) {
    return next(error);
  }
};

export const registerUserPOST = async (req, res, next) => {
  try {
    // Get the required field values to register the user
    const { name, username, email, password } = req.body;

    // Validate required fields
    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    //Find the user and if exists already then throw error
    const isExists = await User.findOne({ email });
    if (isExists) return next(createHttpError(404, "User already exists."));

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

export const logoutUser = (req, res, next) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: config.SERVER_ENVIRONMENT === "production" ? true : false, // Ensure it's secure in production
    sameSite: "strict", // Prevent CSRF attacks
  });

  return res.redirect("/login");
};
