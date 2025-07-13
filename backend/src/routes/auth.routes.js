import { Router } from "express";
import { refreshAccessToken } from "../controllers/auth/refreshToken.controller.js";
import { logoutController } from "../controllers/auth/logout.controller.js";

const authRouter = Router();

authRouter.route("/refresh-token").get(refreshAccessToken);

authRouter.route("/logout").post(logoutController);

export default authRouter;
