import { Router } from "express";
import { refreshAccessToken } from "../controllers/auth/refreshToken.controller.js";
import { logoutController } from "../controllers/auth/logout.controller.js";

const authRouter = Router();

authRouter.get("/refresh-token", refreshAccessToken);
authRouter.post("/logout", logoutController);

export default authRouter;
