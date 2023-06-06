const jwt = require("jsonwebtoken");
const User = require("../models/userModels");
const asyncHandler = require("express-async-handler");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send("Access denied. Token is missing.");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send("Access denied. Invalid token.");
    }

    req.user = decoded;
    next();
  });
}
module.exports = { authenticateToken };
