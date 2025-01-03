import { Router } from "express";

import authMiddleware from "../middlewares/auth.middleware.js";

import * as CouponController from "../controllers/coupon.controller.js";

const router = Router();

// auth restricted routes //
router.get("/", authMiddleware, CouponController.getCoupon);

router.post("/validate", authMiddleware, CouponController.validateCoupon);

export default router;
