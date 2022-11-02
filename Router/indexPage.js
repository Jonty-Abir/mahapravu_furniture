const express = require("express");
const { checkLogin } = require("../middleware/common/checkLogin");
const { decorateHtmlResponse } = require("../middleware/common/decodedHtml");
//
const indexPage = express.Router();
indexPage.get(
  "/",
  decorateHtmlResponse("Mahapravu Furniture Home_page"),
  checkLogin,
  (req, res) => {
    const myCookie = req.signedCookies;
    if (myCookie[process.env.COOKIE_NAME]) {
      res.locals.hasCookie = true;
    }
    res.render("index");
  }
);
module.exports = indexPage;
