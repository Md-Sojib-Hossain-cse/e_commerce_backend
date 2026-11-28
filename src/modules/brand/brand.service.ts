import type { UploadApiResponse } from "cloudinary";
import AppError from "../../errors/appError";
import { prisma } from "../../lib/prisma";
import type { TBrandImages, TCreateBrandPayload } from "./brand.interface";
import httpStatus from "http-status";
import uploadToCloudinary from "../../utils/uploadCloudinary";
import cloudinary from "../../config/cloudinary";

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

  if (!payload) {
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
    select: {
      role: true,
      status: true,
    },
  });

  if (
    !performer ||
    (performer.role !== "SUPER_ADMIN" && performer.role !== "ADMIN") ||
    performer.status !== "ACTIVE"
  ) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You do not have permission to create a brand!",
    );
  }

  const brandSlug = (payload.slug?.trim() || payload.name.trim())
    .toLowerCase()
    .replace(/\s+/g, "-");

  const isFeatured =
    payload.isFeatured === true ||
    (typeof payload.isFeatured === "string" && payload.isFeatured === "true");

  const displayOrder = Number(payload.displayOrder);

  if (!Number.isSafeInteger(displayOrder) || displayOrder < 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Display order must be a non-negative integer!",
    );
  }

  const description = payload.description?.trim();
  const website = payload.website?.trim();
  const metaTitle = payload.metaTitle?.trim();
  const metaDescription = payload.metaDescription?.trim();

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
    bannerUpload = banner && (await uploadToCloudinary(banner));
    if (banner && (!bannerUpload?.secure_url || !bannerUpload?.public_id)) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Failed to upload brand banner!",
      );
    }

    result = await prisma.brands.create({
      data: {
        name: payload.name.trim(),
        slug: brandSlug,
        displayOrder,
        logo: logoUpload.secure_url,
        logoPublicId: logoUpload.public_id,
        isFeatured,
        ...(banner &&
          bannerUpload && {
            banner: bannerUpload?.secure_url,
            bannerPublicId: bannerUpload?.public_id,
          }),
        ...(description && { description }),
        ...(website && { website }),
        ...(metaTitle && { metaTitle }),
        ...(metaDescription && { metaDescription }),
        ...(payload.status && {
          status: payload.status,
        }),
      },
    });
  } catch (error) {
    const cleanupTasks = [logoUpload?.public_id, bannerUpload?.public_id]
      .filter((publicId): publicId is string => Boolean(publicId))
      .map((publicId) => cloudinary.uploader.destroy(publicId));

    const cleanupResults = await Promise.allSettled(cleanupTasks);

    cleanupResults.forEach((result) => {
      if (result.status === "rejected") {
        console.error("Cloudinary cleanup failed:", result.reason);
      }
    });

    throw error;
  }

  return result;
};

export const BrandServices = {
  createBrandOnDB,
};
