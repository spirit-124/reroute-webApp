const router = require("express").Router();
const User = require("../models/userModels");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const { getOtp, VerifyOTP } = require("../controllers/authController");

router.get("/Authentication/GetOTP/:phoneNumber");

router.post("/Authentication/VerifyOTP");

module.exports = router;
