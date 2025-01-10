import "dotenv/config";
import jwt from "jsonwebtoken";

import redis from "./redis.js";

/**
 * Auth Process Using JWTs - Access (15 mins) & Refresh (7 days).
 *
 * User Registers or Logs In:
 * An Access JWT and Refresh JWT (payload is the userId, secret key in .env) will be generated for the user.
 * The Refresh JWT will be stored in Redis for the user.
 * The Access JWT and Refresh JWT will both be set in the cookies of the response.
 *
 * User Refreshes Access JWT:
 * Make sure Refresh JWT exists in cookies & validate it with the Refresh JWT stored in Redis.
 * Create new Access JWT and store it in cookies.
 *
 * User Logs Out:
 * The Refresh JWT will be deleted from Redis for the user.
 * The Access JWT and Refresh JWT will be cleared from the cookies of the response.
 */

export const generateAccessJWT = (userId) => {
  const accessJWT = jwt.sign({ userId }, process.env.ACCESS_JWT_SECRET, {
    expiresIn: "15m",
  });
  return accessJWT;
};

export const generateRefreshJWT = (userId) => {
  const refreshJWT = jwt.sign({ userId }, process.env.REFRESH_JWT_SECRET, {
    expiresIn: "7d",
  });
  return refreshJWT;
};

export const storeRefreshJWTRedis = async (userId, refreshJWT) => {
  await redis.set(
    `refreshJWT:${userId}`,
    refreshJWT,
    "EX",
    7 * 24 * 60 * 60 // 7 days
  );
};

export const setAccessJWTCookie = (res, accessJWT) => {
  res.cookie("accessJWT", accessJWT, {
    httpOnly: true, // prevents XSS (cross-site scripting) attacks
    secure: process.env.NODE_ENV === "production", // only secure in production env
    sameSite: "strict", // prevents CSRF (cross-site request forgery) attacks
    maxAge: 15 * 60 * 1000, // 15 minutes
  });
};

export const setRefreshJWTCookie = (res, refreshJWT) => {
  res.cookie("refreshJWT", refreshJWT, {
    httpOnly: true, // prevents XSS (cross-site scripting) attacks
    secure: process.env.NODE_ENV === "production", // only secure in production env
    sameSite: "strict", // prevents CSRF (cross-site request forgery) attacks
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};
