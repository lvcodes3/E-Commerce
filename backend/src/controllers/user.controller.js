import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import redis from "../lib/redis.js";
import * as Auth from "../lib/auth.js";

import User from "../models/user.model.js";

/**
 * POST - http://localhost:5050/api/user/register
 */
export const Register = async (req, res) => {
  try {
    // data validation //
    const { name, email, password, passwordConfirmation } = req.body;

    if (!name || !email || !password || !passwordConfirmation) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (password !== passwordConfirmation) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(401).json({ message: "User already exists." });
    }

    // hash password //
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user //
    const user = await User.create({ name, email, password: hashedPassword });

    // user authentication //
    const accessJWT = Auth.generateAccessJWT(user._id);
    const refreshJWT = Auth.generateRefreshJWT(user._id);

    await Auth.storeRefreshJWTRedis(user._id, refreshJWT);

    Auth.setAccessJWTCookie(res, accessJWT);
    Auth.setRefreshJWTCookie(res, refreshJWT);

    // return user data //
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      cartProducts: user.cartProducts,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * POST - http://localhost:5050/api/user/login
 */
export const Login = async (req, res) => {
  try {
    // data validation //
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // user authentication //
    const accessJWT = Auth.generateAccessJWT(user._id);
    const refreshJWT = Auth.generateRefreshJWT(user._id);

    await Auth.storeRefreshJWTRedis(user._id, refreshJWT);

    Auth.setAccessJWTCookie(res, accessJWT);
    Auth.setRefreshJWTCookie(res, refreshJWT);

    // return user data //
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      cartProducts: user.cartProducts,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * POST - http://localhost:5050/api/user/logout
 */
export const Logout = async (req, res) => {
  try {
    // if refresh JWT exists delete it from redis //
    const refreshJWT = req.cookies.refreshJWT;
    if (refreshJWT) {
      const decodedRefreshJWT = jwt.verify(
        refreshJWT,
        process.env.REFRESH_JWT_SECRET
      );

      await redis.del(`refreshJWT:${decodedRefreshJWT.userId}`);
    }

    // clear JWTs in cookies //
    res.clearCookie("accessJWT");
    res.clearCookie("refreshJWT");

    return res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * POST - http://localhost:5050/api/user/refreshAccessJWT
 */
export const refreshAccessJWT = async (req, res) => {
  try {
    // refresh JWT exists in cookies //
    const refreshJWT = req.cookies.refreshJWT;
    if (!refreshJWT) {
      return res.status(401).json({ message: "No refresh JWT provided." });
    }

    // decode refresh JWT //
    const decodedRefreshJWT = jwt.verify(
      refreshJWT,
      process.env.REFRESH_JWT_SECRET
    );

    // get redis refresh JWT //
    const storedRefreshJWT = await redis.get(
      `refreshJWT:${decodedRefreshJWT.userId}`
    );

    // validate refresh JWT //
    if (refreshJWT !== storedRefreshJWT) {
      return res.status(401).json({ message: "Invalid refresh JWT." });
    }

    // create new access JWT //
    const accessJWT = Auth.generateAccessJWT(decodedRefreshJWT.userId);

    // set access JWT cookie //
    Auth.setAccessJWTCookie(res, accessJWT);

    return res.status(200).json({
      message: "Access JWT refreshed successfully.",
    });
  } catch (error) {
    console.error("Refresh Access JWT Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * GET - http://localhost:5050/api/user/profile
 */
export const profile = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json(user);
  } catch (error) {
    console.error("Profile Error:", error);
    return res.status(500).json({ message: error.message });
  }
};
