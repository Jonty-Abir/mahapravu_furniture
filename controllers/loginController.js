const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Signup = require("../models/userSchema");
const { validationResult } = require("express-validator");
const login = async (req, res, next) => {
  try {
    const user = await Signup.findOne({
      $or: [{ email: req.body.email }, { password: req.body.password }],
    });
    if (user && user._id) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (validPassword) {
        const userObj = {
          userID: user._id,
          userName: user.username,
          email: user.email,
          avatar: user.avatar,
        };
        const token = jwt.sign(userObj, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRY,
        });

        // setSign cookie
        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.JWT_EXPIRY,
          httpOnly: true,
          signed: true,
        });
        res.locals.loggedInUser = userObj;
        res.redirect("/home");
      } else {
        throw createError("Login failed! Please try again.");
      }
    } else {
      throw createError("Login failed! Please try again.");
    }
  } catch (err) {
    res.render("login", {
      data: req.body.email,
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
};
module.exports = login;
