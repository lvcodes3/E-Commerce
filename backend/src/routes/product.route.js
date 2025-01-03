import { Router } from "express";

import authMiddleware from "../middlewares/auth.middleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";

import * as ProductController from "../controllers/product.controller.js";

const router = Router();

// unrestricted routes //
router.get("/featured", ProductController.getFeaturedProducts);

router.get("/recommended", ProductController.getRecommendedProducts);

router.get("/category/:category", ProductController.getProductsByCategory);

// auth & admin restricted routes //
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  ProductController.getAllProducts
);

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  ProductController.createProduct
);

router.patch(
  "/:productId",
  authMiddleware,
  adminMiddleware,
  ProductController.toggleIsFeaturedProduct
);

router.delete(
  "/:productId",
  authMiddleware,
  adminMiddleware,
  ProductController.deleteProduct
);

export default router;
