import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import type { TRegister } from "./auth.interface";
import { config } from "../../config";
import jwt, { type SignOptions } from "jsonwebtoken";
import AppError from "../../errors/appError";
import httpStatus from "http-status";

const registerUserOnDB = async (payload: TRegister) => {
  const { password } = payload;
  const name = payload.name.trim();
  const email = payload.email.toLocaleLowerCase().trim();

  //hash password to store secure hashed password into db
  const hashedPassword: string = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );

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

const loginUserOnDB = async (payload: TRegister) => {
  const { name, email, password } = payload;

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
  });
  //user created successful
  if (user.id) {
    const jwtAccessPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const jwtAccessExpiresIN = config.jwt_access_expires_in;

    const token = jwt.sign(
      jwtAccessPayload,
      config.jwt_access_secret as string,
      {
        expiresIn: jwtAccessExpiresIN,
      } as SignOptions,
    );

    console.log(token);
  }
};

export const AuthServices = {
  registerUserOnDB,
};
