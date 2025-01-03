import express from "express";
import {
  LoginUserGET,
  LoginUserPOST,
  registerUserPOST,
} from "../controller/auth.controller.js";
const router = express.Router();

router.route("/login").get(LoginUserGET).post(LoginUserPOST);

router.route("/register").post(registerUserPOST);

export default router;
