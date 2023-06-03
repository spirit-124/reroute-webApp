const router = require("express").Router();
const User = require("../models/userModels");
const {
  LogIn,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/users");

router.post("/LogIn", LogIn);
router.route("/profile").get(getUserProfile).put(updateUserProfile);

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
