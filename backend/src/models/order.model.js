import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User id is required."],
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: [true, "Product id is required."],
        },
        quantity: {
          type: Number,
          min: [1, "Quantity must be at least 1."],
          required: [true, "Quantity is required."],
        },
        price: {
          type: Number,
          min: [0, "Price must be at least 0."],
          required: [true, "Price is required."],
        },
      },
    ],
    totalAmount: {
      type: Number,
      min: [0, "Total amount must be at least 0."],
      required: [true, "Total amount is required."],
    },
    stripeSessionId: {
      type: String,
      unique: true,
      required: [true, "Strip session id is required."],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);
