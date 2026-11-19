import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import { validateSchema } from "../../middlewares/validateSchema";
import {
  UserLoginValidationSchema,
  UserRegistrationValidationSchema,
} from "./auth.validation";
import { uploadTextOnly } from "../../middlewares/multer";

const router = Router();

router.post(
  "/register",
  uploadTextOnly(),
  validateSchema(UserRegistrationValidationSchema),
  AuthControllers.registerUser,
);

router.post(
  "/login",
  uploadTextOnly(),
  validateSchema(UserLoginValidationSchema),
  AuthControllers.loginUser,
);

router.post("/google", AuthControllers.googleAuth);

export const authRoutes = router;
