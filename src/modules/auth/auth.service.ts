import { jwtUtils } from "./../../utils/jwtUtils";
import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import crypto from "crypto";

import type {
  TForgetPassword,
  TGoogleLogin,
  TLogin,
  TRegister,
} from "./auth.interface";
import { config } from "../../config";
import { type JwtPayload, type SignOptions } from "jsonwebtoken";
import AppError from "../../errors/appError";
import httpStatus from "http-status";
import { googleClient } from "../../lib/google";
import { sendForgetPasswordEmail } from "../../lib/nodeMailer";

//user registration using email and password
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

//user login using email and password
const loginUserFromDB = async (payload: TLogin) => {
  const { password, isRemember } = payload;
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

  if (isUserExists.status !== "ACTIVE") {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Your account is currently inactive or suspended. Please activate your account or contact support.",
    );
  }

  //update latest logged in time
  await prisma.users.update({
    where: {
      email,
    },
    data: {
      lastLoggedInAt: new Date(),
    },
  });

  //making jwt payload & generate token for authenticated user
  const jwtAccessTokenPayload = {
    id: isUserExists.id,
    name: isUserExists.name,
    email: isUserExists.email,
    role: isUserExists.role,
    tokenType: "accessToken",
  };

  const jwtRefreshTokenPayload = {
    id: isUserExists.id,
    name: isUserExists.name,
    email: isUserExists.email,
    role: isUserExists.role,
    tokenType: "refreshToken",
  };

  const accessToken = jwtUtils.generateToken(
    jwtAccessTokenPayload,
    config.jwt_access_secret,
    (isRemember ? config.jwt_access_expires_in : "1d") as SignOptions,
  );

  const refreshToken = jwtUtils.generateToken(
    jwtRefreshTokenPayload,
    config.jwt_refresh_secret,
    (isRemember ? config.jwt_refresh_expires_in : "1d") as SignOptions,
  );

  return {
    accessToken,
    refreshToken,
    isRemember,
  };
};

//google auth service
const googleAuthService = async (payload: TGoogleLogin) => {
  // 1. Verify Google's ID token
  const ticket = await googleClient.verifyIdToken({
    idToken: payload.idToken,
    audience: config.google_client_id,
  });

  // 2. Extract verified user information
  const googleUser = ticket.getPayload();

  if (
    !googleUser ||
    !googleUser.email ||
    !googleUser.email_verified ||
    !googleUser.sub
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid Google account");
  }

  const { sub: googleId, email, name, picture } = googleUser;

  const normalizedEmail = email.toLowerCase().trim();

  // 3. Find customer by Google ID
  let user = await prisma.users.findUnique({
    where: { googleId },
  });

  // 4. Find existing account by email
  if (!user) {
    user = await prisma.users.findUnique({
      where: { email: normalizedEmail },
    });

    if (user) {
      user = await prisma.users.update({
        where: { id: user.id },
        data: {
          googleId,
          emailVerifiedAt: user.emailVerifiedAt ?? new Date(),
        },
      });
    } else {
      // 5. Create a new customer
      user = await prisma.users.create({
        data: {
          name: name || "Google User",
          email: normalizedEmail,
          googleId,
          image: picture ? picture : null,
          emailVerifiedAt: new Date(),
        },
      });
    }
  }

  if (user && user.isDeleted) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This account has been deleted. Please contact support if you believe this is a mistake.",
    );
  }

  if (user.status !== "ACTIVE") {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Your account is currently inactive or suspended. Please activate your account or contact support.",
    );
  }

  //trying to take latest logged in time
  await prisma.users.update({
    where: {
      email,
    },
    data: {
      lastLoggedInAt: new Date(),
    },
  });

  // 6. Generate YOUR OWN JWT tokens here.
  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwtUtils.generateToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in as SignOptions,
  );

  const refreshToken = jwtUtils.generateToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in as SignOptions,
  );

  const { password, ...userWithoutPassword } = user;

  return { userWithoutPassword, accessToken, refreshToken };
};

//forget password service
const forgetPasswordService = async (payload: TForgetPassword) => {
  const { email } = payload;

  const genericResponse = {
    message:
      "If an account exists with this email, you will receive a password reset link.",
  };

  const user = await prisma.users.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      name: true,
      password: true,
    },
  });

  // Avoid exposing whether the email is registered.
  if (!user) return genericResponse;

  // Apply this only if your authentication policy
  // does not allow password creation for OAuth accounts.
  if (!user.password) return genericResponse;

  // Generate a cryptographically secure random token.
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Store only the SHA-256 hash.
  const tokenHash = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // 15-minute expiration.
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  // Invalidate previous tokens and create a new one.
  const resetRecord = await prisma.$transaction(async (tx) => {
    await tx.passwordReset.deleteMany({
      where: {
        userId: user.id,
      },
    });

    return tx.passwordReset.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt,
      },
      select: {
        id: true,
        expiresAt: true,
      },
    });
  });

  // Build the reset URL.
  const resetUrl = new URL("/reset-password", config.frontend_url_dev);

  resetUrl.searchParams.set("id", resetRecord.id);
  resetUrl.searchParams.set("token", resetToken);

  try {
    await sendForgetPasswordEmail(
      user.email,
      "Password Reset Email",
      user.name || "User",
      resetUrl.toString(),
    );
  } catch (error) {
    await prisma.passwordReset.deleteMany({
      where: {
        id: resetRecord.id,
        tokenHash,
      },
    });

    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Unable to send password reset email. Please try again.",
    );
  }

  return genericResponse;
};

const refreshTokenService = async (token: string) => {
  const decodedToken = jwtUtils.verifyToken(
    token,
    config.jwt_refresh_secret as string,
  );

  if (!decodedToken.success || !decodedToken.data) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid Refresh Token!");
  }

  const payload = decodedToken.data as JwtPayload & {
    id?: string;
    tokenType?: string;
  };

  if (typeof payload.id !== "string" || payload.tokenType !== "refreshToken") {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid Refresh Token!");
  }

  const { id } = payload;

  //is user information exist on DB
  const isUserExists = await prisma.users.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isDeleted: true,
      status: true,
    },
  });

  //is password exists and  matched
  if (!isUserExists) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid Refresh Token");
  }

  //check is user status and isDeleted
  if (isUserExists.isDeleted) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This account has been deleted. Please contact support if you believe this is a mistake.",
    );
  }

  if (isUserExists.status !== "ACTIVE") {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Your account is currently inactive or suspended. Please activate your account or contact support.",
    );
  }

  //making jwt payload & generate token for authenticated user
  const jwtAccessTokenPayload = {
    id: isUserExists.id,
    name: isUserExists.name,
    email: isUserExists.email,
    role: isUserExists.role,
    tokenType: "accessToken",
  };

  const accessToken = jwtUtils.generateToken(
    jwtAccessTokenPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in as SignOptions,
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  registerUserOnDB,
  loginUserFromDB,
  googleAuthService,
  forgetPasswordService,
  refreshTokenService,
};
