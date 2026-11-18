import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import upload from "../../middlewares/multer";
import { validateSchema } from "../../middlewares/validateSchema";
import {
  UserLoginValidationSchema,
  UserRegistrationValidationSchema,
} from "./auth.validation";

const router = Router();

router.post(
  "/register",
  upload.none(),
  validateSchema(UserRegistrationValidationSchema),
  AuthControllers.registerUser,
);

router.post(
  "/login",
  upload.none(),
  validateSchema(UserLoginValidationSchema),
  AuthControllers.loginUser,
);

export const authRoutes = router;
