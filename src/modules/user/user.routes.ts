import { Router } from "express";
import { UserControllers } from "./user.controller";
import { auth } from "../../middlewares/auth";
import { UserRoles } from "../../../generated/prisma/enums";
import { validateSchema } from "../../middlewares/validateSchema";
import {
  changeUserRoleValidationSchema,
  changeUserStatusValidationSchema,
  updateMyUserInfoValidationSchema,
  updateMyUserPasswordValidationSchema,
  updateProfilePictureValidationSchema,
} from "./user.validation";
import { uploadSingleImage, uploadTextOnly } from "../../middlewares/multer";
import { profilePictureUpdateLimiter } from "../../middlewares/rateLimiter";

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
  profilePictureUpdateLimiter,
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

router.delete(
  "/me",
  auth(UserRoles.ADMIN, UserRoles.CUSTOMER, UserRoles.STUFF),
  UserControllers.deleteMyAccount,
);

// admin control routes
router.get(
  "/",
  auth(UserRoles.ADMIN, UserRoles.SUPER_ADMIN),
  UserControllers.getAllUser,
);

router.get(
  "/:id",
  auth(UserRoles.ADMIN, UserRoles.SUPER_ADMIN),
  UserControllers.getUserDetails,
);

router.patch(
  "/:id/change-status",
  auth(UserRoles.ADMIN, UserRoles.SUPER_ADMIN),
  validateSchema(changeUserStatusValidationSchema),
  UserControllers.changeUserStatus,
);

router.patch(
  "/:id/change-role",
  auth(UserRoles.ADMIN, UserRoles.SUPER_ADMIN),
  validateSchema(changeUserRoleValidationSchema),
  UserControllers.changeUserRole,
);

router.delete(
  "/:id/delete",
  auth(UserRoles.ADMIN, UserRoles.SUPER_ADMIN),
  UserControllers.deleteUser,
);

export const userRoutes = router;
