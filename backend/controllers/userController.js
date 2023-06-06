const asyncHandler = require("express-async-handler");
const User = require("../models/userModels.js");
const { generateToken } = require("../utils/genrateTokens.js");

// @desc Auth user/set token
// route POST /api/user/auth
// @access public
// const authUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email: email });
//   if (user && (await user.matchpassword(password))) {
//     generateToken(res, user._id);
//     res.status(201).json({ _id: user._id, name: user.name, email: user.email });
//   } else {
//     res.status(401);
//     throw new Error("Invalid email or password");
//   }
// });

// @desc Register new user
// route POST /api/user
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
// route POST /api/user/logout
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
// route GET /api/user/profile
// @access private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne(req.user.id);
  // const user = {
  //   _id: user._id,
  //   email: user.email,
  //   name: user.name,
  // };
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
// route PUT /api/user/profile
// @access private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne(req.user.id);

  if (user) {
    user.username = req.body.username || user.username;
    user.city = req.body.city || user.city;

    // if (req.body.password) {
    //   user.password = req.body.password;
    // }

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
