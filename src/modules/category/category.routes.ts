import { Router } from "express";
import { CategoryController } from "./category.controller";
import { validateSchema } from "../../middlewares/validateSchema";
import { createCategoryValidationSchema } from "./category.validations";
import { auth } from "../../middlewares/auth";
import { UserRoles } from "../../../generated/prisma/enums";
import { uploadSingleImage } from "../../middlewares/multer";

const router = Router();

router.post(
  "/",
  auth(UserRoles.SUPER_ADMIN, UserRoles.ADMIN),
  uploadSingleImage("image"),
  validateSchema(createCategoryValidationSchema),
  CategoryController.createCategory,
);

export const categoryRoutes = router;
