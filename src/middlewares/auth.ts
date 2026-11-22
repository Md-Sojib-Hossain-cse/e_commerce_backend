import httpStatus from "http-status";
import type { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import type { UserRoles } from "../../generated/prisma/enums";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/appError";
import { jwtUtils } from "../utils/jwtUtils";
import { config } from "../config";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        email: string;
        role: UserRoles;
      };
    }
  }
}

export const auth = (...roles: UserRoles[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken
      ? req.cookies.accessToken
      : req.headers.authorization?.startsWith("Bearer")
        ? req.headers.authorization.split(" ")[1]
        : req.headers.authorization;

    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You are not logged in , please logged in to access your resource!",
      );
    }

    const verifyToken = jwtUtils.verifyToken(token, config.jwt_access_secret);

    if (!verifyToken.success) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "Unauthorized access , You do not have permission to access this route!",
      );
    }

    const { email, name, id, role, tokenVersion } = verifyToken.data as {
      email: string;
      name: string;
      id: string;
      tokenVersion: number;
      role: UserRoles;
    };

    const user = await prisma.users.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isDeleted: true,
        status: true,
        tokenVersion: true,
      },
    });

    if (!user || user.isDeleted) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        "This account has been deleted. Please contact support if you believe this is a mistake.",
      );
    }

    if (roles.length && !roles.includes(user.role)) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "You do not have permission to access this route!",
      );
    }

    if (user.status !== "ACTIVE") {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "Your account is currently inactive or suspended. Please activate your account or contact support for assistance.",
      );
    }

    if (Number(user.tokenVersion) !== Number(tokenVersion)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "Your session has expired. Please log in again!",
      );
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    next();
  });
};
