import { ApiError } from "../utils/ApiError.js";

export const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json(
          new ApiError(
            403,
            false,
            `Access denied. Requires role: ${allowedRoles.join(" or ")}`
          )
        );
    }
    next();
  };
};
