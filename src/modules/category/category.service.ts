import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { prisma } from "../../lib/prisma";
import type {
  TCreateCategory,
  TGetAllCategoryQuery,
} from "./category.interface";
import type { UploadApiResponse } from "cloudinary";
import uploadToCloudinary from "../../utils/uploadCloudinary";
import cloudinary from "../../config/cloudinary";
import { Prisma } from "../../../generated/prisma/client";
import type { CategoriesWhereInput } from "../../../generated/prisma/models";
import {
  allowedCategorySearchableFields,
  allowedCategorySortableFields,
} from "./category.consts";

const createCategoryOnDB = async (
  creatorId: string,
  payload: TCreateCategory,
  image: Express.Multer.File,
) => {
  // 1. Validate creator
  if (!creatorId) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Authentication is required!");
  }

  if (!image?.buffer?.length || !payload) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Please provide all required information to create a category!",
    );
  }

  const creator = await prisma.users.findUnique({
    where: {
      id: creatorId,
    },
    select: {
      id: true,
      role: true,
      status: true,
    },
  });

  if (!creator || creator.status !== "ACTIVE") {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You are not authorized to create categories!",
    );
  }

  if (creator.role !== "ADMIN" && creator.role !== "SUPER_ADMIN") {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You are not authorized to create categories!",
    );
  }

  const name = payload.name?.trim();

  if (!name) {
    throw new AppError(httpStatus.BAD_REQUEST, "Category name is required!");
  }

  // 2. Prepare category payload
  const slug = payload.slug?.trim() || name.toLowerCase().replace(/\s+/g, "-");

  if (payload.parentId) {
    const parentCategory = await prisma.categories.findUnique({
      where: {
        id: payload.parentId,
      },
      select: {
        id: true,
        status: true,
      },
    });

    if (!parentCategory) {
      throw new AppError(httpStatus.NOT_FOUND, "Parent category not found!");
    }

    if (parentCategory.status !== "ACTIVE") {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Please active parent category first!",
      );
    }
  }

  let uploadedImage: UploadApiResponse | undefined;

  let result: Prisma.CategoriesGetPayload<{}>;

  try {
    // 3. Upload new image
    uploadedImage = await uploadToCloudinary(image, "image");

    if (!uploadedImage?.secure_url || !uploadedImage.public_id) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Failed to upload category image!",
      );
    }

    // 4. Create category in database
    result = await prisma.categories.create({
      data: {
        createdBy: {
          connect: {
            id: creator.id,
          },
        },
        name,
        slug,
        image: uploadedImage.secure_url,
        imagePublicId: uploadedImage.public_id,
        ...(payload.description !== undefined && {
          description: payload.description,
        }),

        ...(payload.parentId !== undefined && {
          parent: {
            connect: {
              id: payload.parentId,
            },
          },
        }),

        ...(payload.isFeatured !== undefined && {
          isFeatured: payload.isFeatured,
        }),

        ...(payload.displayOrder !== undefined && {
          displayOrder: payload.displayOrder,
        }),

        ...(payload.metaTitle !== undefined && {
          metaTitle: payload.metaTitle,
        }),

        ...(payload.metaDescription !== undefined && {
          metaDescription: payload.metaDescription,
        }),

        ...(payload.status !== undefined && {
          status: payload.status,
        }),
      },
    });
  } catch (error) {
    // 5. Database failed: delete newly uploaded image
    if (uploadedImage?.public_id) {
      try {
        await cloudinary.uploader.destroy(uploadedImage.public_id);
      } catch (cleanupError) {
        console.error("Failed to clean up new Cloudinary image:", cleanupError);
      }
    }

    // 6. Handle duplicate slug
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new AppError(
        httpStatus.CONFLICT,
        "A category with this slug already exists!",
      );
    }

    throw error;
  }

  // 7. Return created category
  return result;
};

const getAllCategoryFromDB = async (query: TGetAllCategoryQuery) => {
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(query.limit) || 10));
  const skip = (page - 1) * limit;

  type SortField = (typeof allowedCategorySortableFields)[number];

  const sortBy: SortField =
    typeof query.sortBy === "string" &&
    allowedCategorySortableFields.includes(query.sortBy as SortField)
      ? (query.sortBy as SortField)
      : "createdAt";
  const sortOrder = query.sortOrder;

  const andConditions: CategoriesWhereInput[] = [];
  const orConditions: CategoriesWhereInput[] = [];

  if (query.isFeatured) {
    if (typeof query.isFeatured === "string") {
      andConditions.push({
        isFeatured: query.isFeatured === "true" ? true : false,
      });
    } else {
      andConditions.push({
        isFeatured: Boolean(query.isFeatured) === true ? true : false,
      });
    }
  }

  if (query.status) {
    andConditions.push({
      status: query.status,
    });
  }

  if (query.createdAtFrom || query.createdAtTo) {
    andConditions.push({
      createdAt: {
        ...(query.createdAtFrom && {
          gte: query.createdAtFrom,
        }),
        ...(query.createdAtTo && {
          lte: query.createdAtTo,
        }),
      },
    });
  }

  if (query.searchTerm) {
    allowedCategorySearchableFields.forEach((field: string) => {
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

  const [result, total] = await Promise.all([
    prisma.categories.findMany({
      where: {
        AND: andConditions,
      },
      select: {
        name: true,
        slug: true,
        image: true,
        displayOrder: true,
        status: true,
        createdAt: true,
        isFeatured: true,
        parent: {
          select: {
            name: true,
          },
        },
        createdBy: {
          select: {
            name: true,
            role: true,
          },
        },
      },
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip,
      take: limit,
    }),
    prisma.categories.count({
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

export const CategoryServices = {
  createCategoryOnDB,
  getAllCategoryFromDB,
};
