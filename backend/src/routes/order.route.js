import { Router } from "express";

import authMiddleware from "../middlewares/auth.middleware.js";

import * as OrderController from "../controllers/order.controller.js";

const router = Router();

// auth restricted routes //
router.post(
  "/createStripeCheckoutSession",
  authMiddleware,
  OrderController.createStripeCheckoutSession
);

router.post(
  "/checkoutSuccess",
  authMiddleware,
  OrderController.checkoutSuccess
);

export default router;
