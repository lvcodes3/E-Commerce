import Coupon from "../models/coupon.model.js";

/**
 * GET - http://localhost:5050/api/coupon
 */
export const getCoupon = async (req, res) => {
  try {
    const user = req.user;

    const coupon = await Coupon.findOne({ userId: user._id, isActive: true });

    return res.status(200).json(coupon || null);
  } catch (error) {
    console.error("Get Coupon Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * POST - http://localhost:5050/api/coupon/validate
 */
export const validateCoupon = async (req, res) => {
  try {
    const user = req.user;
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ message: "Code is required." });
    }

    const coupon = await Coupon.findOne({
      userId: user._id,
      code: code,
      isActive: true,
    });

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found." });
    }

    // coupon is expired //
    if (coupon.expirationDate < new Date()) {
      coupon.isActive = false;

      await coupon.save();

      return res.status(400).json({ message: "Coupon expired." });
    }

    return res.status(200).json({
      message: "Coupon is valid.",
      code: coupon.code,
      discountPercentage: coupon.discountPercentage,
    });
  } catch (error) {
    console.error("Validate Coupon Error:", error);
    return res.status(500).json({ message: error.message });
  }
};
