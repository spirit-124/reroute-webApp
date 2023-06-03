const { Sequelize, DataTypes } = require("sequelize");
const db = require("../utils/db");

const User = db.define("users", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  PANNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  aadharNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  GSTCertificate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // phoneNumber: DataTypes.STRING,
});

module.exports = User;
