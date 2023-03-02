const jwt = require("jsonwebtoken");

require("dotenv").config();

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  // Check for token
  if (!token)
    return res.status(401).json({ msg: "Unauthorized access - No token." });

  try {
    // Verify token
    // Add user from payload
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid." });
  }
}

module.exports = auth;
