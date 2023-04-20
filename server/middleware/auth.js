const jwt = require("jsonwebtoken");
const User = require("../api/users/users.model");

require("dotenv").config();

async function auth(req, res, next) {
  const token = req.header("x-auth-token");

  // Check for token
  if (!token) return res.status(401).json({ error: "Unauthorized access - No token." });

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user exists
    const userExists = await User.findById(decoded.id);
    if (!userExists)
      return res.status(401).json({ error: "Unauthorized access - Invalid user." });

    // Add user from payload
    req.user = decoded;

    next();
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: "Token is not valid." });
  }
}

module.exports = auth;
