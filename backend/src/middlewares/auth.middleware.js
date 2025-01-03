import jwt from "jsonwebtoken";

import User from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
  try {
    // check if access JWT exists in cookies //
    const accessJWT = req.cookies.accessJWT;

    if (!accessJWT) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Access JWT provided." });
    }

    try {
      // verify access JWT //
      const decodedAccessJWT = jwt.verify(
        accessJWT,
        process.env.ACCESS_JWT_SECRET
      );

      const user = await User.findById(decodedAccessJWT.userId).select(
        "-password"
      );

      if (!user) {
        return res
          .status(401)
          .json({ message: "Unauthorized - User not found." });
      }

      req.user = user;

      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Unauthorized - Access JWT expired." });
      }
      throw error;
    }
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res
      .status(401)
      .json({ message: "Unauthorized - Invalid Access JWT." });
  }
};

export default authMiddleware;
