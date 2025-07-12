import { Router } from "express";
import { loginCustomer } from "../controllers/users/loginCustomer.controller.js";
import { refreshAccessToken } from "../controllers/auth/refreshToken.controller.js";
import { registerUser } from "../controllers/users/register.controller.js";
import { verifyCodeAndCreateUser } from "../controllers/users/verify.controller.js";

const userRouter = Router();

userRouter.route("/register").post(registerUser);

userRouter.route("/verify").post(verifyCodeAndCreateUser);

userRouter.route("/customer-login").post(loginCustomer);

userRouter.route("/refresh-token").get(refreshAccessToken);

export default userRouter