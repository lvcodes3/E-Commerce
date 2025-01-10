import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import connectDB from "./lib/db.js";

import userRoutes from "./routes/user.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import orderRoutes from "./routes/order.route.js";
import analyticRoutes from "./routes/analytic.route.js";

// config //
const app = express();
const PORT = process.env.PORT || 5050;

// middlewares //
app.use(express.json({ limit: "10mb" })); // increased limit for file upload
app.use(cookieParser());
app.use(morgan("tiny"));

// routes //
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupon", couponRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/analytic", analyticRoutes);

// main //
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on Port ${PORT}...`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
