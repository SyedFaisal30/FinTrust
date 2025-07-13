import { asyncHandler } from "../../utils/asyncHandler.js";
import { findUserByEmail } from "../../models/users.model.js";
import { generateAccessToken, generateRefreshToken } from "../../services/tokenGenerator.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import bcrypt from "bcryptjs";

export const loginCustomer = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, false,"Email and password are required");
  }

  const user = await findUserByEmail(email);
  if (!user || user.role !== "customer") {
    throw new ApiError(401, false,"Invalid customer credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, false,"Invalid customer credentials");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
    secure:true,
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      "Customer login successful"
    )
  );
});
