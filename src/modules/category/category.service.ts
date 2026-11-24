import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { prisma } from "../../lib/prisma";
import type { TCreateCategory } from "./category.interface";
import type { UploadApiResponse } from "cloudinary";
import uploadToCloudinary from "../../utils/uploadCloudinary";
import cloudinary from "../../config/cloudinary";
import { Prisma } from "../../../generated/prisma/client";

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

export const CategoryServices = {
  createCategoryOnDB,
};
