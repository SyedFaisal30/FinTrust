import { asyncHandler } from "../../utils/asyncHandler.js";
import { findUserByEmail } from "../../models/users.models.js";
import { generateToken } from "../../services/tokenGenerator.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import bcrypt from "bcryptjs"; 

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json(new ApiError(400, false, "Email and password are required"));
  }

  const user = await findUserByEmail(email);
  if (!user) {
    return res
      .status(401)
      .json(new ApiError(401, false, "Invalid email or password"));
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res
      .status(401)
      .json(new ApiError(401, false, "Invalid email or password"));
  }

  const accessToken = generateToken();

  const response = new ApiResponse(
    200,
    {
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
    "Login successful"
  );

  return res.status(200).json(response);
});
