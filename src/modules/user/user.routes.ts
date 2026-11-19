import { Router } from "express";
import { UserControllers } from "./user.controller";
import { auth } from "../../middlewares/auth";
import { UserRoles } from "../../../generated/prisma/enums";
import { validateSchema } from "../../middlewares/validateSchema";
import {
  updateMyUserInfoValidationSchema,
  updateMyUserPasswordValidationSchema,
  updateProfilePictureValidationSchema,
} from "./user.validation";
import { uploadSingleImage, uploadTextOnly } from "../../middlewares/multer";

const router = Router();

//user controlled routes
router.get(
  "/me",
  auth(UserRoles.CUSTOMER, UserRoles.STUFF, UserRoles.ADMIN),
  UserControllers.getMyUserInfo,
);

router.patch(
  "/me",
  auth(UserRoles.CUSTOMER, UserRoles.STUFF, UserRoles.ADMIN),
  uploadTextOnly(),
  validateSchema(updateMyUserInfoValidationSchema),
  UserControllers.updateMyUserInfo,
);
router.patch(
  "/me/update-profile-picture",
  auth(UserRoles.CUSTOMER, UserRoles.STUFF, UserRoles.ADMIN),
  uploadSingleImage("image"),
  validateSchema(updateProfilePictureValidationSchema),
  UserControllers.updateProfilePicture,
);

router.patch(
  "/me/change-password",
  auth(UserRoles.ADMIN, UserRoles.CUSTOMER, UserRoles.STUFF),
  uploadTextOnly(),
  validateSchema(updateMyUserPasswordValidationSchema),
  UserControllers.changeMyPassword,
);

export const userRoutes = router;
