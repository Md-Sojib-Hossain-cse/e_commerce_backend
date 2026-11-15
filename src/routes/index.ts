import { Router } from "express";
import { userRoutes } from "../modules/auth/auth.routes";

const router = Router();

router.use("/users", userRoutes);

export default router;
