import { Router } from "express";
import  { loginUser } from "../controllers/auth.controller.js";
import { registerUser } from "../controllers/register.controller.js";
import { verifyCodeAndCreateUser } from "../controllers/verify.controller.js";

const userRouter = Router();

userRouter.route("/register").post(registerUser);

userRouter.route("/verify").post(verifyCodeAndCreateUser);

userRouter.route("/login").post(loginUser);

export default userRouter