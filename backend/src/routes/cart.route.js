import { Router } from "express";

import authMiddleware from "../middlewares/auth.middleware.js";

import * as CartController from "../controllers/cart.controller.js";

const router = Router();

// auth restricted routes //
router.get("/", authMiddleware, CartController.getProductsInCart);

router.post("/", authMiddleware, CartController.addProductToCart);

router.patch("/", authMiddleware, CartController.updateProductQuantityInCart);

router.delete("/", authMiddleware, CartController.removeProductFromCart);

export default router;
