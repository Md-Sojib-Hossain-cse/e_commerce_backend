import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { userRoutes } from "../modules/user/user.routes";
import { categoryRoutes } from "../modules/category/category.routes";

const router = Router();

router.use("/auth", authRoutes);

router.use("/user", userRoutes);

router.use("/category", categoryRoutes);

export default router;
