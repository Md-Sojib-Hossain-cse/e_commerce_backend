import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import upload from "../../middlewares/multer";
import { validateSchema } from "../../middlewares/validateSchema";
import { UserRegistrationValidationSchema } from "./auth.validation";

const router = Router();

router.post(
  "/register",
  upload.none(),
  validateSchema(UserRegistrationValidationSchema),
  AuthControllers.registerUser,
);

export const authRoutes = router;
