import type { UserRoles, UserStatus } from "../../../generated/prisma/enums";
import type { allowedSortFields } from "./user.const";

export type TUpdateUserInfoPayload = {
  name?: string;
  dateOfBirth?: Date;
  phone?: string;
};

export type TUpdateUserInfo = {
  name?: string;
  dateOfBirth?: Date;
  phone?: string;
};

export type TChangeUserPassword = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type TUpdateProfilePayload = {
  image?: string;
  imagePublicId?: string;
};

export type TUsersQuery = {
  searchTerm?: string;
  limit?: number;
  page?: number;
  sortBy?: "totalPrice" | "createdAt";
  sortOrder?: "asc" | "desc";
  isDeleted?: boolean;
  role?: UserRoles;
  status?: UserStatus;
  lastLoggedInAt?: Date;
  dateOfBirth?: Date;
  createdAt?: Date;
};

export type SortField = (typeof allowedSortFields)[number];
