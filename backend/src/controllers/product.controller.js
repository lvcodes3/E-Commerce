import redis from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";

import Product from "../models/product.model.js";

/**
 * GET - http://localhost:5050/api/product/featured
 */
export const getFeaturedProducts = async (req, res) => {
  try {
    // short circuit - get featured products from redis cache //
    let featuredProducts = await redis.get("featuredProducts");

    if (featuredProducts) {
      return res.status(200).json(JSON.parse(featuredProducts));
    }

    // get featured products from db //
    featuredProducts = await Product.find({
      isFeatured: true,
    }).lean(); // .lean() will return a js obj instead of a mongodb doc

    if (!featuredProducts) {
      return res.status(404).json({ message: "No featured products found." });
    }

    // store featured products in redis cache //
    await redis.set("featuredProducts", JSON.stringify(featuredProducts));

    return res.status(200).json(featuredProducts);
  } catch (error) {
    console.error("Get Featured Products Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * GET - http://localhost:5050/api/product/recommended
 */
export const getRecommendedProducts = async (req, res) => {
  try {
    const recommendedProducts = await Product.aggregate([
      {
        $sample: { size: 3 },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          image: 1,
          price: 1,
        },
      },
    ]);
    return res.status(200).json(recommendedProducts);
  } catch (error) {
    console.error("Get Recommended Products Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * GET - http://localhost:5050/api/product/category/:category
 */
export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const categoryProducts = await Product.find({
      category,
    });

    return res.status(200).json(categoryProducts);
  } catch (error) {
    console.error("Get Products By Category Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * GET - http://localhost:5050/api/product
 */
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json(products);
  } catch (error) {
    console.error("Get All Products Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * POST - http://localhost:5050/api/product
 */
export const createProduct = async (req, res) => {
  try {
    // data validation //
    const { name, description, price, stock, image, category } = req.body;

    if (!name || !description || !price || !stock || !image || !category) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // upload image url to cloudinary //
    const cloudinaryResponse = await uploadImageUrlToCloudinary(res, image);

    // create product //
    const newProduct = await Product.create({
      name,
      description,
      price,
      stock,
      image: cloudinaryResponse?.secure_url
        ? cloudinaryResponse.secure_url
        : "",
      category,
    });

    return res.status(201).json(newProduct);
  } catch (error) {
    console.error("Create Product Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * PATCH - http://localhost:5050/api/product/:productId
 */
export const toggleIsFeaturedProduct = async (req, res) => {
  try {
    // data validation //
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({ message: "Product id is required." });
    }

    // get & validate product //
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // toggle is featured //
    product.isFeatured = !product.isFeatured;

    const updatedProduct = await product.save();

    // update redis featured products //
    await updateRedisFeaturedProducts(res);

    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Toggle Is Featured Product Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE - http://localhost:5050/api/product/:productId
 */
export const deleteProduct = async (req, res) => {
  try {
    // data validation //
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({ message: "Product id is required." });
    }

    // get & validate product //
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // delete product image from cloudinary //
    await deleteProductImageFromCloudinary(res, product);

    // delete product //
    await Product.findByIdAndDelete(productId);

    return res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    console.error("Delete Product Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Helpers
 */
const uploadImageUrlToCloudinary = async (res, image) => {
  try {
    let cloudinaryResponse = await cloudinary.uploader.upload(image, {
      folder: "products",
    });
    return cloudinaryResponse;
  } catch (error) {
    console.error("Upload Image Url To Cloudinary Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

const deleteProductImageFromCloudinary = async (res, product) => {
  try {
    const cloudinaryImageId = product.image.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`products/${cloudinaryImageId}`);
    console.log(`Deleted image: ${cloudinaryImageId} from Cloudinary.`);
  } catch (error) {
    console.error("Delete Product Image From Cloudinary Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

const updateRedisFeaturedProducts = async (res) => {
  try {
    const featuredProducts = await Product.find({ isFeatured: true }).lean();
    await redis.set("featuredProducts", JSON.stringify(featuredProducts));
  } catch (error) {
    console.error("Update Redis Featured Products Error:", error);
    return res.status(500).json({ message: error.message });
  }
};
