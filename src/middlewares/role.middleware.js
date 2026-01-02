import { ApiError } from "../utils/ApiError.js";

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user || !req.user.role) {
        throw new ApiError(403, "User role not found");
      }

      if (!allowedRoles.includes(req.user.role)) {
        throw new ApiError(403, "Access denied for this role");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
