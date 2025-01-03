import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    price: {
      type: Number,
      min: [0, "Price must be at least 0."],
      required: [true, "Price is required."],
    },
    image: {
      type: String,
      required: [true, "Image is required."],
    },
    category: {
      type: String,
      enum: ["electronics", "clothing", "accessories"],
      required: [true, "Category is required."],
    },
    isFeatured: {
      type: Boolean,
      default: false,
      required: [true, "Is featured is required."],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
