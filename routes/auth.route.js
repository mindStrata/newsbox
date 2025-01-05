import express from "express";
import {
  LoginUserGET,
  LoginUserPOST,
  logoutUser,
  registerUserPOST,
} from "../controller/auth.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
const router = express.Router();

router.route("/login").get(LoginUserGET).post(LoginUserPOST);

router.route("/register").post(registerUserPOST);

router.post("/logout", isAuthenticated, logoutUser);

export default router;
