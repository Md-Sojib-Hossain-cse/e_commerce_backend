import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import type { TLogin, TRegister } from "./auth.interface";
import { config } from "../../config";
import { type SignOptions } from "jsonwebtoken";
import AppError from "../../errors/appError";
import httpStatus from "http-status";
import { generateToken } from "../../utils/jwtUtils";

const registerUserOnDB = async (payload: TRegister) => {
  const { password } = payload;
  const name = payload.name.trim();
  const email = payload.email.toLowerCase().trim();

  //checking if user already exists
  const isUserExists = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  if (isUserExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      "User with this email already exists!",
    );
  }

  //hash password to store secure hashed password into db
  const hashedPassword: string = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );

  //creating user into DB
  const user = await prisma.users.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  return user;
};

const loginUserFromDB = async (payload: TLogin) => {
  const { password } = payload;
  const email = payload.email.toLowerCase().trim();

  //is user information exist on DB
  const isUserExists = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  //is password exists and  matched
  if (!isUserExists || !isUserExists.password) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid email or password");
  }
  const isPasswordMatched = await bcrypt.compare(
    password,
    isUserExists.password as string,
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid email or password");
  }

  //check is user status and isDeleted
  if (isUserExists.isDeleted) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This account has been deleted. Please contact support if you believe this is a mistake.",
    );
  }

  if (isUserExists.status === "INACTIVE") {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Your account is currently inactive. Please activate your account or contact support for assistance.",
    );
  }

  if (isUserExists.status === "SUSPENDED") {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Your account has been suspended. Please reach out to our support team for further information.",
    );
  }

  //making jwt payload & generate token for authenticated user
  const jwtPayload = {
    id: isUserExists.id,
    name: isUserExists.name,
    email: isUserExists.email,
    role: isUserExists.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in as SignOptions,
  );

  const refreshToken = generateToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in as SignOptions,
  );

  console.log({ accessToken, refreshToken });

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthServices = {
  registerUserOnDB,
  loginUserFromDB,
};
