import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { User } from "../models/user.model.js";

/* GET METHOD */
export const LoginUserGET = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    jwt.verify(token, config.jwtSecret, async (err, decoded) => {
      if (err) {
        return res.render("login");
      }
    });
    if (token) {
      res.redirect("/home");
    } else {
      res.render("login");
    }
  } catch (error) {
    console.log(error);
  }
};

/* POST METHOD */
export const LoginUserPOST = async (req, res, next) => {
  const { email, password } = req.body;
  console.log({ email, password });

  try {
    const user = await User.findOne({ email }).select("+password");
    console.log(user);
    // Throw error if the user is not found
    if (!user) return next(createHttpError.NotFound());
    if (!user.password)
      return next(createHttpError(500, "Something went wrong..."));
    const isMatched = user.password === password;
    // Throw error if the password is not matched
    console.log(isMatched);
    if (!isMatched) return next(createHttpError(401, "Invalid credentials"));
    const token = jwt.sign({ _id: user._id }, config.jwtSecret, {
      expiresIn: "1h", //JWT token will expire within an hour
    });
    res.cookie("token", token, {
      // httpOnly: true, // Keep httpOnly for security purposes
      // sameSite: "None", // Allow cross-origin cookies
      secure: config.SERVER_ENVIRONMENT === "production" ? true : false, // Secure only in production (HTTPS)
      maxAge: 60 * 60 * 1000, // One hour validity
    });
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
    next(error);
  }
};
