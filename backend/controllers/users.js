const router = require("express").Router();
const User = require("../models/userModels");

const LogIn = async (req, res) => {
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

  try {
    const user = User.create({
      username,
      contact,
      city,
      PANNumber,
      aadharNumber,
      GSTCertificate,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findAll();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error.message);
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

module.exports = { LogIn, getUserProfile, updateUserProfile };
