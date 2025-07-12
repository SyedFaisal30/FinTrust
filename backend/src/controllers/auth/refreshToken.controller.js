import { asyncHandler } from "../../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { generateAccessToken } from "../../services/tokenGenerator.js";

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    throw new ApiError(401, false,"Refresh token missing");
  }

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = generateAccessToken(decoded);

    return res
      .status(200)
      .json(new ApiResponse(200, { accessToken }, "New access token issued"));
  } catch (error) {
    throw new ApiError(403, false,"Invalid or expired refresh token");
  }
});
