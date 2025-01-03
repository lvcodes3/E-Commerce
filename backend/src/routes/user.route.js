import { Router } from "express";

import authMiddleware from "../middlewares/auth.middleware.js";

import * as UserController from "../controllers/user.controller.js";

const router = Router();

// unrestricted routes //
router.post("/register", UserController.Register);

router.post("/login", UserController.Login);

router.post("/logout", UserController.Logout);

router.post("/refreshAccessJWT", UserController.refreshAccessJWT);

// auth restricted routes //
router.get("/profile", authMiddleware, UserController.profile);

export default router;
