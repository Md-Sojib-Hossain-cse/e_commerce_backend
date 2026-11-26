import type { CategoryStatus } from "../../../generated/prisma/enums";

export type TCreateCategory = {
  parentId?: string;
  name: string;
  slug?: string | null;
  description?: string | null;
  isFeatured?: boolean;
  displayOrder?: number | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  status?: CategoryStatus;
};

export type TGetAllCategoryQuery = {
  searchTerm?: string;
  page?: number;
  limit?: number;
  sortBy?:
    | "name"
    | "isFeatured"
    | "displayOrder"
    | "status"
    | "createdAt"
    | "updatedAt";
  sortOrder?: "asc" | "desc";
  isFeatured?: boolean;
  status?: CategoryStatus;
  createdAtFrom?: Date;
  createdAtTo?: Date;
};

export type TUpdateCategory = {
  name?: string;
  slug?: string;
  description?: string;
  image?: string;
  imagePublicId?: string;
  parentId?: string;
  isFeatured?: boolean;
  displayOrder?: number;
  metaTitle?: string;
  metaDescription?: string;
  status?: CategoryStatus;
};
