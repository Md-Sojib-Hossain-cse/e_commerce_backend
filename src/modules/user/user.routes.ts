import { Router } from "express";
import { UserControllers } from "./user.controller";
import { auth } from "../../middlewares/auth";
import { UserRoles } from "../../../generated/prisma/enums";
import { validateSchema } from "../../middlewares/validateSchema";
import { UserUpdateValidationSchema } from "./user.validation";
import { uploadSingleImage } from "../../middlewares/multer";

const router = Router();

router.get(
  "/",
  auth(UserRoles.CUSTOMER, UserRoles.STUFF, UserRoles.ADMIN),
  UserControllers.getMyUserInfo,
);

router.patch(
  "/",
  auth(UserRoles.CUSTOMER, UserRoles.STUFF, UserRoles.ADMIN),
  uploadSingleImage("image"),
  validateSchema(UserUpdateValidationSchema),
  UserControllers.updateUser,
);

export const userRoutes = router;
