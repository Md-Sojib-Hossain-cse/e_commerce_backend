import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import { validateSchema } from "../../middlewares/validateSchema";
import {
  UserForgetPasswordValidationSchema,
  UserLoginValidationSchema,
  UserRegistrationValidationSchema,
} from "./auth.validation";
import { uploadTextOnly } from "../../middlewares/multer";
import { authLimiter } from "../../middlewares/rateLimiter";
import { auth } from "../../middlewares/auth";
import { UserRoles } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/register",
  uploadTextOnly(),
  validateSchema(UserRegistrationValidationSchema),
  AuthControllers.registerUser,
);

router.post(
  "/login",
  authLimiter,
  uploadTextOnly(),
  validateSchema(UserLoginValidationSchema),
  AuthControllers.loginUser,
);

router.post("/google", AuthControllers.googleAuth);

router.post(
  "/logout",
  auth(UserRoles.CUSTOMER, UserRoles.ADMIN, UserRoles.STUFF),
  AuthControllers.logoutUser,
);

router.post(
  "/forget-password",
  uploadTextOnly(),
  validateSchema(UserForgetPasswordValidationSchema),
  AuthControllers.forgetPassword,
);

router.post("/refresh-token", AuthControllers.refreshToken);

export const authRoutes = router;
