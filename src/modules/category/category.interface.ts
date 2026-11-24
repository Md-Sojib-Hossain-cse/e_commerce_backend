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
