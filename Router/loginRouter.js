const {redirectLogtedIn,logOut}= require("../middleware/common/checkLogin");
const express = require("express");
const upload = require("../utilities/singleFileUploaded");
// internal import's
const doLogin = require("../controllers/loginController");
const {
  loginValidator,
  loginValidatorHandler,
} = require("../middleware/login/loginValidator");
const { decorateHtmlResponse } = require("../middleware/common/decodedHtml");
//
const loginRouter = express.Router();
// get login page
const login =
  ("/",
  (req, res) => {
    res.render("login");
  });

loginRouter.get("/", decorateHtmlResponse("Mahapravu Furniture Login_page"),redirectLogtedIn,(req, res) => {
  res.render("login");
});

loginRouter.post(
  "/",
  decorateHtmlResponse("Mahapravu Furniture login_page"),
  upload.none(),
  loginValidator,
  loginValidatorHandler,
  doLogin
);
loginRouter.delete('/',logOut);
module.exports = loginRouter;
