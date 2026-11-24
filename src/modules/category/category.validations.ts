import z from "zod";
import { CategoryStatus } from "../../../generated/prisma/enums";

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
