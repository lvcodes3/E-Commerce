import { Router } from "express";

import authMiddleware from "../middlewares/auth.middleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";

import * as AnalyticController from "../controllers/analytic.controller.js";

const router = Router();

// auth & admin restricted routes //
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  AnalyticController.getAnalytics
);

export default router;
