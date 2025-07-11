import { asyncHandler } from "../../utils/asyncHandler.js";
import { findUserByEmail } from "../../models/users.model.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../services/tokenGenerator.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json(new ApiError(400, "Email and password are required"));
  }

  const user = await findUserByEmail(email);
  if (!user) {
    return res
      .status(401)
      .json(new ApiError(401, "Invalid email or password"));
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res
      .status(401)
      .json(new ApiError(401, "Invalid email or password"));
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        accessToken, refreshToken,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      "Login successful"
    )
  );
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json(new ApiError(401, "Refresh token missing"));
  }

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = generateAccessToken(decoded);

    return res
      .status(200)
      .json(new ApiResponse(200, { accessToken }, "New access token issued"));
  } catch (error) {
    return res
      .status(403)
      .json(new ApiError(403, "Invalid or expired refresh token"));
  }
});
