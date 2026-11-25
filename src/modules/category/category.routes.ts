import { Router } from "express";
import { CategoryController } from "./category.controller";
import { validateSchema } from "../../middlewares/validateSchema";
import {
  createCategoryValidationSchema,
  getAllCategoryQueryValidationSchema,
} from "./category.validations";
import { auth } from "../../middlewares/auth";
import { UserRoles } from "../../../generated/prisma/enums";
import { uploadSingleImage } from "../../middlewares/multer";
import validateRequest from "../../middlewares/validateRequest";

const router = Router();

router.post(
  "/",
  auth(UserRoles.SUPER_ADMIN, UserRoles.ADMIN),
  uploadSingleImage("image"),
  validateSchema(createCategoryValidationSchema),
  CategoryController.createCategory,
);

router.get(
  "/",
  validateRequest({
    query: getAllCategoryQueryValidationSchema,
  }),
  CategoryController.getAllCategory,
);

router.get("/:slug", CategoryController.getSpecificCategory);

export const categoryRoutes = router;
