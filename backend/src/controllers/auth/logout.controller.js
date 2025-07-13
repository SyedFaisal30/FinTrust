import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "None",
  path: "/",
};

export const logoutController = asyncHandler(async (req, res) => {
  res.clearCookie("refreshToken", cookieOptions);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Logged out successfully"));
});
