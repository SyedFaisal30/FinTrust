import { Router } from "express";
import  { loginUser } from "../controllers/auth.controller.js";


const userRouter = Router();

userRouter.route("/login").post(loginUser);

export default userRouter