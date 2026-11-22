import type { UserRoles } from "../../../generated/prisma/enums";

export const allowedSortFields = [
  "createdAt",
  "updatedAt",
  "name",
  "email",
  "lastLoggedInAt",
] as const;

export const allowedUserStatus = ["ACTIVE", "INACTIVE", "SUSPENDED"] as const;

export const allowedUserRoles = [
  "CUSTOMER",
  "STUFF",
  "ADMIN",
  "SUPER_ADMIN",
] as const;

export const allowedRolesByPerformer: Partial<Record<UserRoles, UserRoles[]>> =
  {
    ADMIN: ["CUSTOMER", "STUFF"],
    SUPER_ADMIN: ["CUSTOMER", "STUFF", "ADMIN"],
  };
