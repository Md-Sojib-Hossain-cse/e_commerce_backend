import AppError from "../../errors/appError";
import { prisma } from "../../lib/prisma";
import type { TDecodedUser } from "../../types";
import httpStatus from "http-status";
import type {
  TChangeUserPassword,
  TUpdateProfilePayload,
  TUpdateUserInfo,
  TUpdateUserInfoPayload,
} from "./user.interface";
import uploadToCloudinary from "../../utils/uploadCloudinary";
import type { UploadApiResponse } from "cloudinary";
import cloudinary from "../../config/cloudinary";
import bcrypt from "bcryptjs";
import { config } from "../../config";

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
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      image: true,
      dateOfBirth: true,
      role: true,
      status: true,
      emailVerifiedAt: true,
      phoneVerifiedAt: true,
      isDeleted: true,
      createdAt: true,
      updatedAt: true,
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

  if (result.status !== "ACTIVE") {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Your account is currently inactive or suspended. Please activate your account or contact support.",
    );
  }

  return result;
};

const updateMyUserInfoOnDB = async (
  userId: string,
  payload: TUpdateUserInfoPayload,
) => {
  if (!userId) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "Unauthorized access! Please log in again.",
    );
  }

  // 1. Verify user exists and account is active
  const isUserExists = await prisma.users.findUnique({
    where: { id: userId },
    select: {
      id: true,
      status: true,
      isDeleted: true,
      imagePublicId: true,
    },
  });

  if (!isUserExists || isUserExists.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "User profile not found!");
  }
  if (isUserExists.status !== "ACTIVE") {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Your account is currently inactive or suspended. Please activate your account or contact support.",
    );
  }

  // 2. Whitelist ONLY safe fields (prevents role/status/email tampering)
  const safeUpdateData: TUpdateUserInfo = {};

  if (payload.name !== undefined) {
    const trimmedName = payload.name.trim();
    if (!trimmedName) {
      throw new AppError(httpStatus.BAD_REQUEST, "Name cannot be empty.");
    }
    safeUpdateData.name = trimmedName;
  }

  if (payload.phone !== undefined) {
    const trimmedPhone = payload.phone.trim();
    if (!trimmedPhone) {
      throw new AppError(httpStatus.BAD_REQUEST, "Phone cannot be empty.");
    }
    safeUpdateData.phone = trimmedPhone;
  }

  if (
    payload.dateOfBirth !== undefined &&
    new Date(payload.dateOfBirth) < new Date()
  ) {
    safeUpdateData.dateOfBirth = payload.dateOfBirth;
  }

  // Reject empty update requests
  if (Object.keys(safeUpdateData).length === 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Please provide at least one valid field to update.",
    );
  }

  const result = await prisma.users.update({
    where: { id: userId },
    data: safeUpdateData,
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      image: true,
      dateOfBirth: true,
      updatedAt: true,
    },
  });

  return result;
};

const changeMyPasswordFromDB = async (
  userId: string,
  payload: TChangeUserPassword,
) => {
  const { newPassword, oldPassword, confirmPassword } = payload;

  if (newPassword !== confirmPassword) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "New password and confirm password do not match.",
    );
  }

  if (oldPassword === confirmPassword) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "New password cannot be the same as your old password.",
    );
  }

  // check if user exists or not
  const user = await prisma.users.findUnique({
    where: {
      id: userId,
    },
    select: {
      password: true,
      isDeleted: true,
      status: true,
    },
  });

  if (!user || user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "User profile not found!");
  }

  if (!user.password) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You can't change a local password of this account!",
    );
  }

  if (user.status !== "ACTIVE") {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Your account is currently inactive or suspended. Please activate your account or contact support.",
    );
  }

  // check old password
  const isPasswordMatched = await bcrypt.compare(oldPassword, user.password);

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Old password is incorrect");
  }

  //hash password and update in db
  const hashedNewPassword = await bcrypt.hash(
    confirmPassword,
    Number(config.bcrypt_salt_rounds),
  );

  const result = await prisma.users.update({
    where: {
      id: userId,
    },
    data: {
      password: hashedNewPassword,
    },
    select: {
      updatedAt: true,
    },
  });

  return {
    success: result ? true : false,
  };
};

const updateProfilePictureOnDB = async (
  userId: string,
  payload?: Express.Multer.File,
) => {
  if (!payload) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Please provide an image you're trying to update!",
    );
  }

  const user = await prisma.users.findUnique({
    where: {
      id: userId,
    },
    select: {
      isDeleted: true,
      status: true,
      imagePublicId: true,
    },
  });

  if (!user || user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "User profile not found!");
  }
  if (user.status !== "ACTIVE") {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Your account is currently inactive or suspended. Please activate your account or contact support.",
    );
  }

  const uploadedImage: UploadApiResponse | undefined = payload?.buffer?.length
    ? await uploadToCloudinary(payload, "user")
    : undefined;

  const safeUpdateData: TUpdateProfilePayload = {};

  // Prepare image data
  if (uploadedImage) {
    safeUpdateData.image = uploadedImage.secure_url;
    safeUpdateData.imagePublicId = uploadedImage.public_id;
  }

  let result;

  try {
    // Update database first
    result = await prisma.users.update({
      where: { id: userId },
      data: safeUpdateData,
      select: {
        image: true,
        updatedAt: true,
      },
    });
  } catch (error) {
    // Database failed: remove newly uploaded image
    if (uploadedImage) {
      try {
        await cloudinary.uploader.destroy(uploadedImage.public_id);
      } catch (cleanupError) {
        console.error("Failed to clean up new Cloudinary image:", cleanupError);
      }
    }

    throw error;
  }

  // Database succeeded: remove previous image
  if (uploadedImage && user.imagePublicId) {
    try {
      await cloudinary.uploader.destroy(user.imagePublicId);
    } catch (cleanupError) {
      console.error("Failed to delete old Cloudinary image:", cleanupError);
    }
  }

  return result;
};

const deleteMyAccountFromDB = async (userId: string) => {
  if (!userId) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You do not have permission to delete this account!",
    );
  }

  const user = await prisma.users.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      isDeleted: true,
    },
  });

  if (!user || user.isDeleted) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "User you're trying to delete possibly already deleted!",
    );
  }

  const activeOrders = await prisma.orders.findFirst({
    where: {
      userId,
      status: {
        in: [
          "PENDING",
          "CONFIRMED",
          "PROCESSING",
          "OUT_FOR_DELIVERY",
          "READY_TO_SHIP",
          "SHIPPED",
        ],
      },
    },
    select: {
      id: true,
    },
  });

  if (activeOrders) {
    throw new AppError(
      httpStatus.CONFLICT,
      "You cannot delete your account while you have active orders!",
    );
  }

  const result = await prisma.users.update({
    where: {
      id: userId,
      isDeleted: false,
    },
    data: {
      isDeleted: true,
    },
    select: {
      isDeleted: true,
    },
  });

  return {
    success: result ? true : false,
  };
};

export const UserServices = {
  getMyUserInfoFromDB,
  updateMyUserInfoOnDB,
  changeMyPasswordFromDB,
  updateProfilePictureOnDB,
  deleteMyAccountFromDB,
};
