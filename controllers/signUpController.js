const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { unlink } = require("fs");
// internal import's
const Signup = require("../models/userSchema");
const path = require("path");
const { sign } = require("crypto");
//
async function signUp(req, res, next) {
  // conver hash password
  let newUser,
    isEqual = false,
    hasEmail,
    hasNo;
  let hashPassword = false;
  if (req.body.password.trim().length >= 8) {
    hashPassword = await bcrypt.hash(req.body.password, 10);
  }
  if (req.files && req.files.length > 0) {
    const { filename } = req.files[0];
    newUser = new Signup({
      ...req.body,
      password: hashPassword ? hashPassword : req.body.password,
      avatar: filename,
    });
  } else {
    newUser = new Signup({
      ...req.body,
      password: hashPassword ? hashPassword : req.body.password,
    });
  }
  if (req.body.password === req.body.confirmPw) {
    isEqual = true;
  }
  try {
    // check email or number is alreay used or not
    hasEmail = await Signup.findOne({ email: req.body.email });
    hasNo = await Signup.findOne({ mobile: req.body.mobile });
    // save user detailes on database
    const result = await newUser.save();
    const user = await Signup.findOne({ email: req.body.email });
    const userObj = {
      userID: user._id,
      userName: user.username,
      email: user.email,
      avatar: user.avatar,
    };
    const token = jwt.sign(userObj, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY,
    });
    res.cookie(process.env.COOKIE_NAME, token, {
      maxAge: process.env.JWT_EXPIRY,
      httpOnly: true,
      signed: true,
    });
    res.json({ success: result });
  } catch (err) {
    const hasUser = await Signup.findOne({ email: req.body.email });
    if (hasUser) {
      const deleteUser = await Signup.findByIdAndDelete({ _id: hasUser._id });
    }
    console.log(err.message);
    if (req.files && req.files.length > 0) {
      const { filename } = req.files[0];
      unlink(path.join(__dirname, `/../public/uploads/${filename}`), (err) => {
        if (err) console.log(err);
      });
    }
    res.json({
      error: err,
      hasEmail,
      hasNo,
      isEqual,
    });
  }
}
module.exports = { signUp };
