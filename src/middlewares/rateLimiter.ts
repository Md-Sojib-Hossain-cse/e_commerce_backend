import httpStatus from "http-status";
import { rateLimit } from "express-rate-limit";

// Authentication limiter
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  message:
    "Too many authentication attempts. Please try again after 15 minutes.",
  legacyHeaders: false,
});

export const profilePictureUpdateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  message: {
    success: false,
    message:
      "Too many authentication attempts. Please try again after 15 minutes.",
    statusCode: httpStatus.BAD_REQUEST,
  },
  legacyHeaders: false,
});

export const changePasswordLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  message: "Too many authentication attempts. Please try again after 24 hours.",
  legacyHeaders: false,
});
