import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";
import bcrypt from "bcryptjs";
import { createUser } from "../../models/users.models.js";
import {
  findVerificationByEmail,
  deleteVerificationByEmail
} from "../../models/verifications.models.js";

export const verifyCodeAndCreateUser = asyncHandler(async (req, res) => {
  const { email, code } = req.body;

  const record = await findVerificationByEmail(email);

  if (!record || record.code !== code) {
    return res
      .status(400)
      .json(new ApiError(400, false, "Invalid verification code"));
  }

  if (new Date() > new Date(record.expires_at)) {
    return res
      .status(400)
      .json(new ApiError(400, false, "Verification code has expired"));
  }

  const hashedPassword = await bcrypt.hash(record.password, 10);

  const user = await createUser(record.name, record.email, hashedPassword, record.role);

  await deleteVerificationByEmail(email);

  return res
    .status(201)
    .json(new ApiResponse(201, "User registered successfully", user));
});
