import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json(
      new ApiError(401, false, "Unauthorized: No token provided", ["Missing or malformed Authorization header"])
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (err) {
    return res.status(401).json(
      new ApiError(401, false, "Unauthorized: Invalid or expired token", [err.message])
    );
  }
};
