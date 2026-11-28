import type { BrandStatus } from "../../../generated/prisma/enums";

export type TCreateBrandPayload = {
  name: string;
  slug: string;
  description?: string;
  logo: string;
  banner?: string;
  website?: string;
  isFeatured: boolean;
  displayOrder: number;
  metaTitle?: string;
  metaDescription?: string;
  status?: BrandStatus;
};

export type TUpdateBrand = {
  name?: string;
  slug?: string;
  description?: string;
  website?: string;
  isFeatured?: boolean;
  displayOrder?: number;
  metaTitle?: string;
  metaDescription?: string;
  status?: BrandStatus;
};

export type TBrandImages = {
  logo?: Express.Multer.File[];
  banner?: Express.Multer.File[];
};

export type TGetAllBrandQuery = {
  searchTerm?: string;
  page?: number;
  limit?: number;
  sortBy?:
    | "name"
    | "slug"
    | "description"
    | "isFeatured"
    | "displayOrder"
    | "createdAt"
    | "updatedAt";
  sortOrder?: "asc" | "desc";
  isFeatured?: boolean;
  status?: BrandStatus;
  createdAtFrom?: Date;
  createdAtTo?: Date;
};
