import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { prisma } from "../../lib/prisma";
import type {
  TCreateCategory,
  TGetAllCategoryQuery,
  TUpdateCategory,
} from "./category.interface";
import type { UploadApiResponse } from "cloudinary";
import uploadToCloudinary from "../../utils/uploadCloudinary";
import cloudinary from "../../config/cloudinary";
import { Prisma } from "../../../generated/prisma/client";
import type {
  CategoriesUpdateInput,
  CategoriesWhereInput,
} from "../../../generated/prisma/models";
import {
  allowedCategorySearchableFields,
  allowedCategorySortableFields,
} from "./category.consts";
import type { TUpdateCategoryPayload } from "./category.validations";

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

const getSpecificCategoryFromDB = async (slug: string) => {
  if (!slug) {
    throw new AppError(httpStatus.NOT_FOUND, "Please Provide a valid slug!");
  }

  const result = await prisma.categories.findFirst({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      image: true,
      description: true,
      displayOrder: true,
      status: true,
      isFeatured: true,
      metaTitle: true,
      metaDescription: true,
      parent: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
      createdBy: {
        select: {
          id: true,
          name: true,
          role: true,
          email: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Category Not Found!");
  }
  return result;
};

const updateCategoryOnDB = async (
  performerId: string,
  categorySlug: string,
  payload: TUpdateCategoryPayload,
  image?: Express.Multer.File,
) => {
  if (!performerId) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You do not have access to update a category!",
    );
  }

  if (!categorySlug) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Please Provide a valid category url!",
    );
  }

  const performer = await prisma.users.findUnique({
    where: {
      id: performerId,
    },
    select: {
      role: true,
    },
  });

  if (
    !performer ||
    (performer.role !== "SUPER_ADMIN" && performer.role !== "ADMIN")
  ) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You do not have permission to update this category!",
    );
  }

  const targetedCategory = await prisma.categories.findUnique({
    where: {
      slug: categorySlug,
    },
    select: {
      id: true,
      imagePublicId: true,
    },
  });

  if (!targetedCategory) {
    throw new AppError(httpStatus.NOT_FOUND, "Category not found!");
  }

  if (payload.parentId === targetedCategory.id) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "A category cannot be its own parent!",
    );
  }

  const updateCategorySafePayload: TUpdateCategory = {};

  // Only allow explicitly approved fields
  if (payload.name !== undefined) {
    updateCategorySafePayload.name = payload.name;
  }

  if (payload.slug !== undefined && typeof payload.slug === "string") {
    updateCategorySafePayload.slug = payload.slug;
  }

  if (
    payload.description !== undefined &&
    typeof payload.description === "string"
  ) {
    updateCategorySafePayload.description = payload.description;
  }

  if (payload.isFeatured !== undefined) {
    updateCategorySafePayload.isFeatured =
      payload.isFeatured === "true" ? true : false;
  }

  if (
    payload.displayOrder !== undefined &&
    (typeof payload.displayOrder === "number" ||
      typeof payload.displayOrder === "string")
  ) {
    updateCategorySafePayload.displayOrder = Number(payload.displayOrder);
  }

  if (
    payload.metaTitle !== undefined &&
    typeof payload.metaTitle === "string"
  ) {
    updateCategorySafePayload.metaTitle = payload.metaTitle;
  }

  if (
    payload.metaDescription !== undefined &&
    typeof payload.metaDescription === "string"
  ) {
    updateCategorySafePayload.metaDescription = payload.metaDescription;
  }

  if (payload.status !== undefined) {
    updateCategorySafePayload.status = payload.status;
  }

  if (payload.parentId !== undefined && typeof payload.parentId === "string") {
    const parentCategory = await prisma.categories.findUnique({
      where: {
        id: payload.parentId,
      },
    });
    if (!parentCategory) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        "Your provided Parent Category doesn't exists!",
      );
    }
    updateCategorySafePayload.parentId = payload.parentId;
  }

  let uploadedImage: UploadApiResponse | undefined;
  let result;

  if (image?.buffer.length) {
    uploadedImage = await uploadToCloudinary(image, "image");

    if (!uploadedImage?.secure_url || !uploadedImage.public_id) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Failed to upload category image!",
      );
    }

    updateCategorySafePayload.image = uploadedImage.secure_url;
    updateCategorySafePayload.imagePublicId = uploadedImage.public_id;
  }

  if (
    Object.keys(updateCategorySafePayload).length === 0 &&
    !image?.buffer.length
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Please provide valid information to update a category!",
    );
  }

  try {
    result = await prisma.categories.update({
      where: {
        id: targetedCategory.id,
      },
      data: updateCategorySafePayload,
      select: {
        id: true,
        name: true,
        slug: true,
        status: true,
        image: true,
        description: true,
        displayOrder: true,
        isFeatured: true,
        parent: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        children: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        metaTitle: true,
        metaDescription: true,
        createdBy: {
          select: {
            id: true,
            name: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  } catch (error) {
    if (uploadedImage?.public_id) {
      try {
        await cloudinary.uploader.destroy(uploadedImage.public_id);
      } catch (cleanupError) {
        console.error("Failed to clean up new image:", cleanupError);
      }
    }

    throw error;
  }

  // Database update succeeded. Clean up old image separately.
  if (uploadedImage?.public_id && targetedCategory.imagePublicId) {
    try {
      await cloudinary.uploader.destroy(targetedCategory.imagePublicId);
    } catch (cleanupError) {
      console.error("Failed to delete old image:", cleanupError);
    }
  }

  return result;
};

const deleteCategoryFromDB = async (
  performerId: string,
  categorySlug: string,
) => {
  const normalizeSlug = categorySlug.trim();
  if (!performerId) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You do not have permission to delete a category.",
    );
  }

  if (!normalizeSlug) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Please try to delete a valid category!",
    );
  }

  const user = await prisma.users.findUnique({
    where: {
      id: performerId,
    },
    select: {
      status: true,
      isDeleted: true,
      role: true,
    },
  });

  if (!user || user.isDeleted || user.status !== "ACTIVE") {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You do not have permission to delete category , please try to contact an admin.",
    );
  }

  if (user.role !== "SUPER_ADMIN" && user.role !== "ADMIN") {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You do not have permission to delete categories!",
    );
  }

  const category = await prisma.categories.findUnique({
    where: {
      slug: normalizeSlug,
    },
    select: {
      id: true,
      isDeleted: true,
      children: {
        where: {
          isDeleted: false,
        },
        select: {
          id: true,
        },
        take: 1,
      },
    },
  });

  if (!category || category.isDeleted) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Category not found or already deleted!",
    );
  }

  if (category.children.length > 0) {
    throw new AppError(
      httpStatus.CONFLICT,
      "Please move or delete the child categories before deleting this category!",
    );
  }

  const deletedCategory = await prisma.categories.updateMany({
    where: {
      slug: normalizeSlug,
      isDeleted: false,
    },
    data: {
      isDeleted: true,
    },
  });

  if (deletedCategory.count === 0) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Category not found or already deleted!",
    );
  }

  return {
    success: true,
    data: null,
  };
};

export const CategoryServices = {
  createCategoryOnDB,
  getAllCategoryFromDB,
  getSpecificCategoryFromDB,
  updateCategoryOnDB,
  deleteCategoryFromDB,
};
