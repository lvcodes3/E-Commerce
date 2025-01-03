import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: [true, "User id is required."],
    },
    code: {
      type: String,
      unique: true,
      required: [true, "Code is required."],
    },
    discountPercentage: {
      type: Number,
      min: [0, "Discount percentage must be at least 0."],
      max: [100, "Discount percentage must be at most 100"],
      required: [true, "Discount percentage is required."],
    },
    expirationDate: {
      type: Date,
      required: [true, "Expiration date is required."],
    },
    isActive: {
      type: Boolean,
      default: true,
      required: [true, "Is active is required."],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Coupon", couponSchema);
