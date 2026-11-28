import { z } from "zod";
import { brandSearchableFields } from "./brand.consts";
import { BrandStatus } from "../../../generated/prisma/enums";

export const createBrandValidationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Brand name is required.")
    .max(50, "Brand name cannot exceed 50 characters."),

  slug: z
    .string()
    .trim()
    .min(1, "Brand slug is required.")
    .max(60, "Brand slug cannot exceed 60 characters.")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain lowercase letters, numbers, and hyphens only.",
    ),

  description: z
    .string()
    .trim()
    .max(255, "Description cannot exceed 255 characters.")
    .optional(),

  logo: z.string().url("Invalid logo URL").optional().nullable(),

  banner: z
    .string()
    .url("Please provide a valid image URL")
    .optional()
    .nullable(),

  website: z
    .string()
    .trim()
    .url("Please provide a valid website URL.")
    .optional(),

  isFeatured: z.enum(["true", "false"]).default("false"),

  displayOrder: z.coerce
    .number()
    .int("Display order must be an integer.")
    .min(0)
    .max(32767),

  metaTitle: z.string().trim().optional(),

  metaDescription: z.string().trim().optional(),

  status: z.enum(["ACTIVE", "INACTIVE", "ARCHIVED"]).default("INACTIVE"),
});

export const updateBrandValidationSchema =
  createBrandValidationSchema.partial();

// Query validation
export const getAllBrandQueryValidationSchema = z
  .object({
    // Pagination
    page: z
      .string()
      .optional()
      .default("1")
      .transform(Number)
      .pipe(
        z
          .number()
          .int("Page must be an integer!")
          .min(1, "Page must be at least 1!")
          .max(1000000, "Page value is too large!"),
      ),

    limit: z
      .string()
      .optional()
      .default("10")
      .transform(Number)
      .pipe(
        z
          .number()
          .int("Limit must be an integer!")
          .min(1, "Limit must be at least 1!")
          .max(100, "Limit cannot exceed 100!"),
      ),

    // Sorting
    sortBy: z.enum(brandSearchableFields).optional().default("createdAt"),

    sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),

    // Filters
    isFeatured: z
      .enum(["true", "false"])
      .optional()
      .transform((value) =>
        value === undefined ? undefined : value === "true",
      ),

    status: z.nativeEnum(BrandStatus).optional(),

    // Date filters
    createdAtFrom: z.string().datetime({ offset: true }).optional(),

    createdAtTo: z.string().datetime({ offset: true }).optional(),

    // Search
    searchTerm: z
      .string()
      .trim()
      .min(1, "Search term cannot be empty!")
      .max(100, "Search term cannot exceed 100 characters!")
      .optional(),
  })
  .strict()
  .refine(
    (data) =>
      !data.createdAtFrom ||
      !data.createdAtTo ||
      new Date(data.createdAtFrom) <= new Date(data.createdAtTo),
    {
      message: "Starting date cannot be later than ending date!",
      path: ["createdAtTo"],
    },
  );
