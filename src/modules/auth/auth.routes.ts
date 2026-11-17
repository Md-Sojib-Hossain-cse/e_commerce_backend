import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import upload from "../../middlewares/multer";

const router = Router();

router.post("/register", upload.none(), AuthControllers.registerUser);

export const authRoutes = router;
