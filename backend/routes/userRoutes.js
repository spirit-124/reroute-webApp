const router = require("express").Router();
const User = require("../models/userModels");
/* This line of code is importing three functions (`registerUser`, `getUserProfile`, and
`updateUserProfile`) from the `../controllers/users` module and assigning them to constants with the
same names using destructuring assignment. These functions are likely used in the routes defined in
the router. */
// const {
//   registerUser,
//   getUserProfile,
//   updateUserProfile,
// } = require("../controllers/users");
const {
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");
const { authenticateToken } = require("../middlewares/authMiddleware");

router.post("/", registerUser);
router
  .route("/profile")
  .get(authenticateToken, getUserProfile)
  .put(authenticateToken, updateUserProfile);

// router.route("/profile").get(getUserProfile).put(updateUserProfile);
// router.post("/", async (req, res) => {
//   const { username, contact } = req.body;

//   if (!(contact && username)) {
//     res.status(400).send("All input is required");
//   }

//   if (oldUser) {
//     return res.status(409).send("User Already Exist. Please Login");
//   }

//   const oldUser = await User.findOne(contact);
// });

module.exports = router;
