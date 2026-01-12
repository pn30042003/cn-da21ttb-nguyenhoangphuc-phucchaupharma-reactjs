// authMiddleware.js
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Không có Token được cung cấp" });
  }

  jwt.verify(token.split(" ")[1], "your-secret-key", (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Token không hợp lệ" });
    }
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
