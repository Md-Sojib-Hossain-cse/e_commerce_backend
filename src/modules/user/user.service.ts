import AppError from "../../errors/appError";
import { prisma } from "../../lib/prisma";
import type { TDecodedUser } from "../../types";
import httpStatus from "http-status";
import type { TUpdateUserInfo, TUpdateUserInfoPayload } from "./user.interface";
import uploadToCloudinary from "../../utils/uploadCloudinary";
import type { UploadApiResponse } from "cloudinary";
import cloudinary from "../../config/cloudinary";

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

const updateUserOnDB = async (
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
  if (isUserExists.status === "INACTIVE") {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Your account is currently inactive. Please activate your account or contact support.",
    );
  }

  if (isUserExists.status === "SUSPENDED") {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Your account has been suspended. Please contact support for further information.",
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

  const uploadedImage: UploadApiResponse | undefined = payload.img?.buffer
    ?.length
    ? await uploadToCloudinary(payload.img, "user")
    : undefined;

  // Prepare image data
  if (uploadedImage) {
    safeUpdateData.image = uploadedImage.secure_url;
    safeUpdateData.imagePublicId = uploadedImage.public_id;
  }

  // Reject empty update requests
  if (Object.keys(safeUpdateData).length === 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Please provide at least one valid field to update.",
    );
  }

  let result;

  try {
    // Update database first
    result = await prisma.users.update({
      where: { id: userId },
      data: safeUpdateData,
      select: {
        id: true,
        email: true,
        name: true,
        dateOfBirth: true,
        phone: true,
        image: true,
        role: true,
        status: true,
        emailVerifiedAt: true,
        phoneVerifiedAt: true,
        lastLoggedInAt: true,
        createdAt: true,
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
  if (uploadedImage && isUserExists.imagePublicId) {
    try {
      await cloudinary.uploader.destroy(isUserExists.imagePublicId);
    } catch (cleanupError) {
      console.error("Failed to delete old Cloudinary image:", cleanupError);
    }
  }

  return result;
};

export const UserServices = {
  getMyUserInfoFromDB,
  updateUserOnDB,
};
