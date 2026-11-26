import z from "zod";
import { CategoryStatus } from "../../../generated/prisma/enums";
import { allowedCategorySortableFields } from "./category.consts";

export const createCategoryValidationSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Minimum 2 Characters Requires as category name!")
      .max(30, "Category name can't be more then 30 character long!"),
    slug: z
      .string()
      .trim()
      .min(2)
      .max(35)
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Slug must contain lowercase letters, numbers, and hyphens only!",
      )
      .optional(),
    description: z
      .string()
      .trim()
      .min(10, "Minimum 10 Characters Requires as category description!")
      .max(255, "Category Description can't be more then 250 character long!")
      .optional(),
    parentId: z.string().uuid().optional(),
    isFeatured: z.boolean().optional(),
    displayOrder: z.number().int().min(0).max(500).optional(),
    metaTitle: z.string().trim().max(60).optional(),
    metaDescription: z.string().trim().max(160).optional(),
    status: z.enum(CategoryStatus).optional(),
  })
  .strict();

export const getAllCategoryQueryValidationSchema = z
  .object({
    // Search
    searchTerm: z.string().trim().optional(),

    // Pagination
    page: z.coerce.number().int().min(1).default(1),

    limit: z.coerce.number().int().min(1).max(100).default(10),

    // Sorting
    sortBy: z.enum(allowedCategorySortableFields).default("createdAt"),

    sortOrder: z.enum(["asc", "desc"]).default("desc"),

    // Filters
    isFeatured: z
      .enum(["true", "false"])
      .transform((value) => value === "true")
      .optional(),

    status: z.nativeEnum(CategoryStatus).optional(),

    // Date filters
    createdAtFrom: z.coerce.date().optional(),

    createdAtTo: z.coerce.date().optional(),
  })
  .refine(
    (data) =>
      !data.createdAtFrom ||
      !data.createdAtTo ||
      data.createdAtFrom <= data.createdAtTo,
    {
      message: "createdAtFrom must be earlier than or equal to createdAtTo",
      path: ["createdAtTo"],
    },
  );

export type TGetAllCategoryQuery = z.infer<
  typeof getAllCategoryQueryValidationSchema
>;

export const UpdateCategoryValidationSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Category name must be at least 2 characters")
      .max(25, "Category name cannot exceed 25 characters")
      .optional(),

    slug: z
      .string()
      .trim()
      .min(2, "Slug must be at least 2 characters")
      .max(30, "Slug cannot exceed 30 characters")
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Slug must contain lowercase letters, numbers, and hyphens only",
      )
      .optional()
      .nullable(),

    description: z
      .string()
      .trim()
      .max(255, "Description cannot exceed 255 characters")
      .optional()
      .nullable(),

    image: z
      .string()
      .url("Please provide a valid image URL")
      .optional()
      .nullable(),

    parentId: z
      .string()
      .uuid("Please provide a valid parent category ID")
      .optional()
      .nullable(),

    isFeatured: z.boolean().optional(),

    displayOrder: z
      .number()
      .int("Display order must be an integer")
      .min(0, "Display order is too small")
      .max(32767, "Display order is too large")
      .optional()
      .nullable(),

    metaTitle: z.string().trim().optional().nullable(),

    metaDescription: z.string().trim().optional().nullable(),

    status: z.nativeEnum(CategoryStatus).optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required to update category",
  });

export type TUpdateCategoryPayload = z.infer<typeof UpdateCategoryValidationSchema>;
