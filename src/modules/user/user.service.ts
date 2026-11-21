import AppError from "../../errors/appError";
import { prisma } from "../../lib/prisma";
import type { TDecodedUser } from "../../types";
import httpStatus from "http-status";
import type {
  TChangeUserPassword,
  TUpdateProfilePayload,
  TUpdateUserInfo,
  TUpdateUserInfoPayload,
  TUsersQuery,
} from "./user.interface";
import uploadToCloudinary from "../../utils/uploadCloudinary";
import type { UploadApiResponse } from "cloudinary";
import cloudinary from "../../config/cloudinary";
import bcrypt from "bcryptjs";
import { config } from "../../config";
import type { UsersWhereInput } from "../../../generated/prisma/models";
import { allowedSortFields } from "./user.const";

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

//admin services

const getAllUserFromDB = async (userId: string, query: TUsersQuery) => {
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(query.limit) || 10));
  const skip = (page - 1) * limit;

  type SortField = (typeof allowedSortFields)[number];

  const sortBy: SortField =
    typeof query.sortBy === "string" &&
    allowedSortFields.includes(query.sortBy as SortField)
      ? (query.sortBy as SortField)
      : "createdAt";
  const sortOrder =
    query.sortOrder && query.sortOrder === "asc" ? "asc" : "desc";

  const andConditions: UsersWhereInput[] = [];
  const orConditions: UsersWhereInput[] = [];

  const usersSearchableFields = ["name", "email", "phone"];

  if (query.isDeleted) {
    andConditions.push({
      isDeleted: Boolean(query.isDeleted) === true ? true : false,
    });
  }

  if (query.role) {
    andConditions.push({
      role: query.role,
    });
  }

  if (query.status) {
    andConditions.push({
      status: query.status,
    });
  }

  if (query.lastLoggedInAt) {
    andConditions.push({
      lastLoggedInAt: {
        gte: new Date(query.lastLoggedInAt),
      },
    });
  }

  if (query.dateOfBirth) {
    andConditions.push({
      dateOfBirth: {
        gte: new Date(query.dateOfBirth),
      },
    });
  }

  if (query.createdAt) {
    andConditions.push({
      createdAt: {
        gte: new Date(query.createdAt),
      },
    });
  }

  if (query.searchTerm) {
    usersSearchableFields.forEach((field: string) => {
      orConditions.push({
        [field]: {
          contains: (query.searchTerm as string).trim(),
          mode: "insensitive",
        },
      });
    });

    andConditions.push({
      OR: orConditions,
    });
  }

  if (!userId) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You do not have permission , to see users information!",
    );
  }

  const isUserExists = await prisma.users.findUnique({
    where: {
      id: userId,
    },
    select: {
      isDeleted: true,
      role: true,
    },
  });

  if (
    !isUserExists ||
    isUserExists.isDeleted ||
    isUserExists.role !== "ADMIN"
  ) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You do not have permission , to see users information!",
    );
  }

  const [result, total] = await Promise.all([
    prisma.users.findMany({
      where: {
        AND: andConditions,
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
        lastLoggedInAt: true,
        phoneVerifiedAt: true,
        isDeleted: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip,
      take: limit,
    }),
    prisma.users.count({
      where: {
        AND: andConditions,
      },
    }),
  ]);

  return {
    result,
    meta: {
      total,
      page,
      limit,
    },
  };
};

const getUserDetailsFromDB = async (userId: string, payload: string) => {
  if (!userId) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You're not permitted to access this route!",
    );
  }

  if (!payload) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "User details you're trying to access is not found!",
    );
  }

  const adminInfo = await prisma.users.findUnique({
    where: {
      id: userId,
      role: "ADMIN",
    },
    select: {
      isDeleted: true,
      status: true,
    },
  });

  if (!adminInfo || adminInfo.isDeleted) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You're not permitted to access this route!",
    );
  }

  if (adminInfo.status !== "ACTIVE") {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You're not permitted to access this route!",
    );
  }

  const user = await prisma.users.findUnique({
    where: {
      id: payload,
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
      lastLoggedInAt: true,
      phoneVerifiedAt: true,
      isDeleted: true,
      createdAt: true,
      updatedAt: true,
      addresses: true,
    },
  });

  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "User details you're trying to access is not found!",
    );
  }

  return user;
};

export const UserServices = {
  getMyUserInfoFromDB,
  updateMyUserInfoOnDB,
  changeMyPasswordFromDB,
  updateProfilePictureOnDB,
  deleteMyAccountFromDB,
  getAllUserFromDB,
  getUserDetailsFromDB,
};
