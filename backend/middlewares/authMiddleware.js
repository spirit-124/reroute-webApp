// const jwt = require("jsonwebtoken");
// const asyncHandler = require("express-async-handler");
// const User = require("../models/userModels.js");

// const protect = asyncHandler(async (req, res, next) => {
//   let token;

//   token = req.cookies.jwt;

//   if (token) {
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       req.user = await User.findById(decoded.userId).select("-password");

//       next();
//     } catch (error) {
//       console.error(error);
//       res.status(401);
//       throw new Error("Not authorized, token failed");
//     }
//   } else {
//     res.status(401);
//     throw new Error("Not authorized, no token");
//   }
// });

// module.exports = protect;

const jwt = require("jsonwebtoken");

function protect(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, "your-secret-key");
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(403).json({ error: "Invalid token" });
  }
}

module.exports = protect;
