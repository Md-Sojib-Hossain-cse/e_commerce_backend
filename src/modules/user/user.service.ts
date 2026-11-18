import AppError from "../../errors/appError";
import { prisma } from "../../lib/prisma";
import type { TDecodedUser } from "../../types";
import httpStatus from "http-status";

const getMyUserInfoFromDB = async (payload: TDecodedUser) => {
  const { id, name, email, role } = payload;
  if (!id || !name || !email || !role) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "Unauthorized access! Please log in again.",
    );
  }

  const result = await prisma.users.findUnique({
    where: {
      id,
    },
    omit: {
      password: true,
      googleId: true,
    },
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "User Profile Not Found!");
  }

  if (result.isDeleted) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This account has been deleted. Please contact support if you believe this is a mistake.",
    );
  }

  if (result.status === "INACTIVE") {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Your account is currently inactive. Please activate your account or contact support for assistance.",
    );
  }

  if (result.status === "SUSPENDED") {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Your account has been suspended. Please reach out to our support team for further information.",
    );
  }

  return result;
};

export const UserServices = {
  getMyUserInfoFromDB,
};
