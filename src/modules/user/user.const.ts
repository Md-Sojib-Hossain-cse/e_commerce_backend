export const allowedSortFields = [
  "createdAt",
  "updatedAt",
  "name",
  "email",
  "lastLoggedInAt",
] as const;

export const allowedUserStatus = ["ACTIVE", "INACTIVE", "SUSPENDED"] as const;
