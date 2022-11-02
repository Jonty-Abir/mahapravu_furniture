const express = require("express");
//
const landingRouter = express.Router();

// internal import's
const { decorateHtmlResponse } = require("../middleware/common/decodedHtml");
const { redirectLogtedIn, checkLogin } = require("../middleware/common/checkLogin");
//
landingRouter.get(
  "/",
  decorateHtmlResponse("Mahapravu Furniture Landing_page"),
  (req, res, next) => {
    const myCookie = req.signedCookies;
    if (myCookie[process.env.COOKIE_NAME]) {
      res.locals.hasCookie = true;
    } else {
      res.locals.hasCookie = false;
    }
    res.render("./partials/landingPage.ejs");
  }
);
//get contact us page
landingRouter.get("/contactUs/",decorateHtmlResponse("Mahapravu Furniture ContactUs_page") ,(req,res,next) => {
  res.render("./partials/contactUs.ejs",{})
});

module.exports = landingRouter;
