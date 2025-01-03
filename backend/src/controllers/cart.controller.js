import Product from "../models/product.model.js";

/**
 * GET - http://localhost:5050/api/cart
 */
export const getProductsInCart = async (req, res) => {
  try {
    const user = req.user;

    // get the products //
    const products = await Product.find({
      _id: { $in: user.cartProducts },
    });

    // add quantity for each product //
    const cartProducts = products.map((product) => {
      const item = user.cartProducts.find(
        (cartProduct) => cartProduct.productId === product.id
      );

      return {
        ...product.toJSON(),
        quantity: item.quantity,
      };
    });

    return res.status(200).json(cartProducts);
  } catch (error) {
    console.error("Get Products In Cart Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * POST - http://localhost:5050/api/cart
 */
export const addProductToCart = async (req, res) => {
  try {
    const user = req.user;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product id is required." });
    }

    // make sure product exists //
    if (!(await Product.findById(productId))) {
      return res.status(400).json({ message: "Product does not exist." });
    }

    // check if user has product in cart //
    const existingProduct = user.cartProducts.find(
      (product) => product.productId === productId
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      user.cartProducts.push({
        quantity: 1,
        productId: productId,
      });
    }

    await user.save();

    return res.status(201).json(user.cartProducts);
  } catch (error) {
    console.error("Add Product To Cart Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * PATCH - http://localhost:5050/api/cart
 */
export const updateProductQuantityInCart = async (req, res) => {
  try {
    const user = req.user;
    const { productId, productQuantity } = req.body;

    if (!productId || !productQuantity) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // make sure product exists //
    if (!(await Product.findById(productId))) {
      return res.status(400).json({ message: "Product does not exist." });
    }

    // check if user has product in cart //
    const existingProduct = user.cartProducts.find(
      (product) => product.productId === productId
    );

    if (!existingProduct) {
      return res
        .status(404)
        .json({ message: "User does not have the Product in cart." });
    }

    // remove product from cart //
    if (productQuantity === 0) {
      user.cartProducts = user.cartProducts.filter(
        (product) => product.productId !== productId
      );

      await user.save();

      return res.status(200).json(user.cartProducts);
    }

    // update product quantity in cart //
    existingProduct.quantity = productQuantity;

    await user.save();

    return res.status(200).json(user.cartProducts);
  } catch (error) {
    console.error("Update Product Quantity In Cart Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE - http://localhost:5050/api/cart
 */
export const removeProductFromCart = async (req, res) => {
  try {
    const user = req.user;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product id is required." });
    }

    // check if user has product in cart //
    const existingProduct = user.cartProducts.find(
      (product) => product.productId === productId
    );

    if (!existingProduct) {
      return res
        .status(400)
        .json({ message: "User does not have the Product in cart." });
    }

    // remove product from cart //
    user.cartProducts = user.cartProducts.filter(
      (product) => product.productId !== productId
    );

    await user.save();

    return res.status(200).json(user.cartProducts);
  } catch (error) {
    console.error("Remove Product From Cart Error:", error);
    return res.status(500).json({ message: error.message });
  }
};
