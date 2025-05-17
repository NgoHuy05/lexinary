const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

module.exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "You are not authenticated" });

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: "Token is not valid" });

      req.user = user; // user = { id, name, role, ... }
      next();
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};


