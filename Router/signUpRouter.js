// external imports
const express = require("express");
const upload = require("../utilities/singleFileUploaded");
//
// internal imports
const { signUp } = require("../controllers/signUpController");
const signUpRouter = express.Router(); // create a router object for signUp
const {addValidator,addUserValidationHandler}= require("../middleware/signup/signUpValidation");
const {decorateHtmlResponse}=require("../middleware/common/decodedHtml");
const {redirectLogtedIn}=require("../middleware/common/checkLogin");
//
signUpRouter.get("/", decorateHtmlResponse("Mahapravu Furniture Signup_page"),redirectLogtedIn,(req, res) => {
  res.render("signUp");
});
// post requested
signUpRouter.post("/", upload.any(), signUp);

// exports modules
module.exports = signUpRouter;
