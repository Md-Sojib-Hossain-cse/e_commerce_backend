import type { UploadApiResponse } from "cloudinary";
import AppError from "../../errors/appError";
import { prisma } from "../../lib/prisma";
import type { TBrandImages, TCreateBrandPayload } from "./brand.interface";
import httpStatus from "http-status";
import uploadToCloudinary from "../../utils/uploadCloudinary";

const createBrandOnDB = async (
  performerId: string,
  payload: TCreateBrandPayload,
  images: TBrandImages,
) => {
  const logo = images?.logo?.[0];
  const banner = images?.banner?.[0];

  if (!logo) {
    throw new AppError(httpStatus.BAD_REQUEST, "Brand logo is required!");
  }

  if (!performerId) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You do not have permission to create a brand!",
    );
  }

  if (!payload && !images.logo) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Please provide valid information to create a brand!",
    );
  }

  //validating user and role
  const performer = await prisma.users.findUnique({
    where: {
      id: performerId,
      isDeleted: false,
    },
  });

  if (
    !performer ||
    (performer.role !== "SUPER_ADMIN" && performer.role !== "ADMIN")
  ) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You do not have permission to create a brand!",
    );
  }

  const brandSlug =
    payload.slug.trim() || payload.name.toLowerCase().replace(/\s+/g, "-");

  let logoUpload: UploadApiResponse | undefined;
  let bannerUpload: UploadApiResponse | undefined;
  let result;

  try {
    logoUpload = await uploadToCloudinary(logo, "image");

    if (!logoUpload?.secure_url || !logoUpload.public_id) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Failed to upload brand logo!",
      );
    }
    const bannerUpload = banner ? await uploadToCloudinary(banner) : null;
    if (banner && (!bannerUpload?.secure_url || !bannerUpload?.public_id)) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Failed to upload brand banner!",
      );
    }

    result = await prisma.brands.create({
      data: {
        name: payload.name,
        slug: brandSlug,
        displayOrder: payload.displayOrder,
        logo: logoUpload.secure_url,
      },
    });
  } catch (error) {}

  return {
    images,
    performerId,
    payload,
  };
};

export const BrandServices = {
  createBrandOnDB,
};
