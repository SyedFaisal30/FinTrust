import { Router } from "express";
import  { loginUser } from "../controllers/users/auth.controller.js";
import { registerUser } from "../controllers/users/register.controller.js";
import { verifyCodeAndCreateUser } from "../controllers/users/verify.controller.js";

const userRouter = Router();

userRouter.route("/register").post(registerUser);

userRouter.route("/verify").post(verifyCodeAndCreateUser);

userRouter.route("/login").post(loginUser);

export default userRouter