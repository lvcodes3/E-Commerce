const adminMiddleware = async (req, res, next) => {
  try {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      return res.status(403).json({ message: "Unauthorized - Admin only." });
    }
  } catch (error) {
    console.error("Admin Middleware Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

export default adminMiddleware;
