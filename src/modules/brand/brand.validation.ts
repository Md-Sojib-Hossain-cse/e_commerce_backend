import { z } from "zod";

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

  isFeatured: z.boolean().default(false),

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
