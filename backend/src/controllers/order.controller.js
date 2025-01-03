import stripe from "../lib/stripe.js";

import Order from "../models/order.model.js";
import Coupon from "../models/coupon.model.js";

/**
 * POST - http://localhost:5050/api/order/createStripeCheckoutSession
 */
export const createStripeCheckoutSession = async (req, res) => {
  try {
    // data validation //
    const user = req.user;
    const { products, couponCode } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "Products are required." });
    }

    if (!Array.isArray(products)) {
      return res.status(400).json({ message: "Invalid products." });
    }

    // stripe specifications //
    let totalAmount = 0;

    const lineItems = products.map((product) => {
      // convert to cents //
      const amount = Math.round(product.price * 100);
      totalAmount += amount * product.quantity;

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: amount,
        },
      };
    });

    // coupon code logic //
    let coupon = null;

    if (couponCode) {
      coupon = await Coupon.findOne({
        code: couponCode,
        userId: user._id,
        isActive: true,
      });

      if (coupon) {
        totalAmount -= Math.round(
          (totalAmount * coupon.discountPercentage) / 100
        );
      }
    }

    // create stripe checkout session //
    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
      discounts: coupon
        ? [
            {
              coupon: await createStripeCoupon(res, coupon.discountPercentage),
            },
          ]
        : [],
      metadata: {
        userId: user._id.toString(),
        couponCode: couponCode || "",
        products: JSON.stringify(
          products.map((product) => ({
            productId: product._id,
            quantity: product.quantity,
            price: product.price,
          }))
        ),
      },
    });

    // only create a new coupon if total amount is >= $200 //
    if (totalAmount >= 20000) {
      await createNewCoupon(res, user._id);
    }

    res.status(200).json({
      stripeCheckoutSessionId: stripeCheckoutSession.id,
      totalAmount: totalAmount / 100,
    });
  } catch (error) {
    console.error("Create Stripe Checkout Session Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * POST - http://localhost:5050/api/order/checkoutSuccess
 */
export const checkoutSuccess = async (req, res) => {
  try {
    // data validation //
    const user = req.user;
    const { stripeCheckoutSessionId } = req.body;

    if (!stripeCheckoutSessionId) {
      return res.status(400).json({ message: "Session id is required." });
    }

    // get the stripe checkout session //
    const stripeCheckoutSession = await stripe.checkout.sessions.retrieve(
      stripeCheckoutSessionId
    );

    // stripe checkout session was paid //
    if (stripeCheckoutSession.payment_status === "paid") {
      // coupon was used //
      if (stripeCheckoutSession.metadata.couponCode) {
        // update coupon //
        await Coupon.findOneAndUpdate(
          {
            userId: stripeCheckoutSession.metadata.userId,
            code: stripeCheckoutSession.metadata.couponCode,
          },
          {
            isActive: false,
          }
        );
      }

      // create a new order //
      const products = JSON.parse(stripeCheckoutSession.metadata.products);

      const newOrder = new Order({
        userId: stripeCheckoutSession.metadata.userId,
        products: products,
        totalAmount: stripeCheckoutSession.amount_total / 100, // convert from cents to dollars
        stripeSessionId: stripeCheckoutSessionId,
      });

      await newOrder.save();

      return res.status(201).json({
        success: true,
        message:
          "Payment successful, order created, and coupon deactivated if used.",
        orderId: newOrder._id,
      });
    }
  } catch (error) {
    console.error("Checkout Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Helpers
 */
const createStripeCoupon = async (res, discountPercentage) => {
  try {
    const stripeCoupon = await stripe.coupons.create({
      percent_off: discountPercentage,
      duration: "once",
    });

    return stripeCoupon.id;
  } catch (error) {
    console.error("Create Stripe Coupon Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

const createNewCoupon = async (res, userId) => {
  try {
    const newCoupon = new Coupon({
      code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
      discountPercentage: 10,
      expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      userId: userId,
    });

    await newCoupon.save();

    return newCoupon;
  } catch (error) {
    console.error("Create New Coupon Error:", error);
    return res.status(500).json({ message: error.message });
  }
};
