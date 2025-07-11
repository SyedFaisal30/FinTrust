import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";
import { findUserByEmail } from "../../models/users.model.js";
import {
  insertVerification,
  findVerificationByEmail
} from "../../models/verifications.model.js";
import { sendEmail } from "../../services/verificationEmail.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await findUserByEmail(email);
  if (existingUser) return res.status(409).json(new ApiError(409, "User already exists"));

  const existingVerification = await findVerificationByEmail(email);
  if (existingVerification) return res.status(409).json(new ApiError(409, "User already exists"));

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); 

  await insertVerification({
    name,
    email,
    password,
    code,
    role: "customer",
    expiresAt
  });

  await sendEmail(name, email, code);

  return res
    .status(200)
    .json(new ApiResponse(200, "Verification code sent to email"));
});
