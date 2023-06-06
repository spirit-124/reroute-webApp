const router = require("express").Router();
const User = require("../models/userModels");
const generateToken = require("../utils/genrateTokens");

const registerUser = async (req, res) => {
  const { username, contact, city, PANNumber, aadharNumber, GSTCertificate } =
    req.body;

  if (
    !(
      username &&
      contact &&
      city &&
      PANNumber &&
      aadharNumber &&
      GSTCertificate
    )
  ) {
    res.status(400).send(" Please provide all required information");
  }
  const userExists = await User.findOne({ where: { aadharNumber } });
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
    generateToken(res, user._id);
    res.status(201).json({ username: user.username, contact: user.contact });
  } else {
    res.status(400);
    throw new Error("Invalid User data");
  }
};

const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      contact: user.contact,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user.contact);
  try {
    if (user) {
      user.username = req.body.username || user.name;
      user.city = req.body.city || user.city;

      const updatedUser = await user.save();
      res.status(200).json(updatedUser);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { registerUser, getUserProfile, updateUserProfile };
