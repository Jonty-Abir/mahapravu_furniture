const mongoose = require("mongoose");
//
// const { Schema, model } = mongoose;
const signUpSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is require*"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is require*"],
      trim: true,
      lowercase: true,
    },
    mobile: {
      type: String,
      required: [true, "mobile no require*"],
      minLength: [10, "invalid number*"],
      maxLength: [10, "invalid number*"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is require*"],
      minLength:[8,"at-least 8 character must*"],
      trim: true,
    },
    avatar: {
      type: String,
      required: [true, "img not found*"],
    },
    permission: {
      type: String,
      required: [true, "allow theme&condition*"],
    },
  },
  {
    timestamps: true,
  }
);

const Signup = mongoose.model("User", signUpSchema);

module.exports = Signup;
