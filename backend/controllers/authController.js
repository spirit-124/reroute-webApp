const router = require("express").Router();
const User = require("../models/userModels");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

// @desc getOTP for user
// route PUT /api/v1/user/Authentication/GetOTP/:phoneNumber
const getOtp = async (req, res) => {
  const phoneNumber = req.params.phoneNumber;

  if (!phoneNumber) {
    return res.status(400).json({ msg: "Please Provide Phone Number" });
  }

  var res = await client.verify.v2
    .services(process.env.TWILIO_SERVICE_ID)
    .verifications.create({
      to: `+91${phoneNumber}`,
      channel: "sms",
    })
    .then((verification) => {
      res.status(200).json({
        msg: "Working",
        phoneNumber: verification.to,
        channel: verification.channel,
      });
    });
};

// @desc VerifyOTP for user
// route PUT /api/v1/user/Authentication/VerifyOTP
const verifyOtp = async (req, res) => {
  const to = req.body.phoneNumber;
  const otp = req.body.otp;

  if (!to || !otp) {
    return res.status(400).json({ msg: "Please provide phoneNumber and otp" });
  }
  await client.verify.v2
    .services(process.env.TWILIO_SERVICE_ID)
    .verificationChecks.create({ to: `+91${to}`, code: otp })
    .then((data) => {
      const status = data.status;

      if (status != "approved") {
        return res.status(403).json({ msg: "Verification Failed" });
      }
      res.status(200).json({ msg: data.status, data });
    });
};
