const router = require("express").Router();
const User = require("../models/userModels");

const {
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");
// const { authenticateToken } = require("../middlewares/authMiddleware");
const protect = require("../middlewares/authMiddleware");

router.post("/", registerUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;
