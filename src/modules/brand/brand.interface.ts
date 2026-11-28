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
