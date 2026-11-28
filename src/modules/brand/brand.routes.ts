import { Router } from "express";
import { BrandControllers } from "./brand.controller";
import { auth } from "../../middlewares/auth";
import { UserRoles } from "../../../generated/prisma/enums";
import { validateSchema } from "../../middlewares/validateSchema";
import {
  createBrandValidationSchema,
  getAllBrandQueryValidationSchema,
  updateBrandValidationSchema,
} from "./brand.validation";
import { uploadMultipleFields } from "../../middlewares/multer";
import validateRequest from "../../middlewares/validateRequest";

const router = Router();

router.post(
  "/",
  auth(UserRoles.SUPER_ADMIN, UserRoles.ADMIN),
  uploadMultipleFields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  validateSchema(createBrandValidationSchema),
  BrandControllers.createBrand,
);

router.patch(
  "/:slug/update",
  auth(UserRoles.SUPER_ADMIN, UserRoles.ADMIN),
  uploadMultipleFields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  validateSchema(updateBrandValidationSchema),
  BrandControllers.updateBrand,
);

router.get(
  "/",
  validateRequest({
    query: getAllBrandQueryValidationSchema,
  }),
  BrandControllers.getAllBrand,
);

router.get("/:slug", BrandControllers.getSpecificBrand);

export const brandRoutes = router;
