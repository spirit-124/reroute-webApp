const asyncHandler = require("express-async-handler");
const User = require("../models/userModels.js");
const { generateToken } = require("../utils/genrateTokens.js");

// @desc Register new user
// route POST /api/v1/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, contact, city, PANNumber, aadharNumber, GSTCertificate } =
    req.body;
  const userExists = await User.findOne({ where: { contact } });
  if (userExists) {
    res.status(400);

    throw new Error("user already exists");
  }

  const user = User.create({
    username,
    contact,
    city,
    PANNumber,
    aadharNumber,
    GSTCertificate,
  });

  if (user) {
    const token = generateToken(res, user.id);
    res
      .status(201)
      .json({ _id: user.id, name: user.name, email: user.email, token });
  } else {
    res.status(400);
    throw new Error("Invalid User data");
  }
});

// @desc LogOut User
// route POST /api/v1/users/logout
// @access public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    message: "User logged out",
  });
});

// @desc get User Profile
// route GET /api/v1/users/SignUp/profile
// @access private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne(req.user.id);

  if (user) {
    res.json({
      id: user.id,
      username: user.username,
      contact: user.contact,
      aadharNumber: user.adharNumber,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Update User Profile
// route PUT /api/v1/users/profile
// @access private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne(req.user.id);

  if (user) {
    user.username = req.body.username || user.username;
    user.city = req.body.city || user.city;

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser.id,
      username: updatedUser.username,
      city: updatedUser.city,
    });
    // console.log(updatedUser._id, updatedUser.name, updatedUser.email);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = {
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
