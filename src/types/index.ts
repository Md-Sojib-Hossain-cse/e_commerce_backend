import type { UserRoles } from "../../generated/prisma/enums";

export type TDecodedUser = {
  id: string;
  name: string;
  email: string;
  role: UserRoles;
};
