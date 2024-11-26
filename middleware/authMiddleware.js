const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Verify JWT and attach user to request
exports.authenticate = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Authorize based on user role
exports.authorize = (role) => (req, res, next) => {
  if (req.user.role !== role)
    return res.status(403).json({ error: "Forbidden" });
  next();
};
