const jwt = require("jsonwebtoken");

function decorateHtmlResponse(page_title) {
  return function (req, res, next) {
    let has = false,
      userDetails = false;
    const cookie =
      Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
    if (cookie) {
      has = true;
      const token = cookie[process.env.COOKIE_NAME];
      userDetails = jwt.verify(token, process.env.JWT_SECRET);
    }
    const date= new Date()
    res.locals.title = `${page_title}`;
    res.locals.errors = "";
    res.locals.data = "";
    res.locals.hasCookie = has ? true : false;
    res.locals.userDetails = has ? userDetails : false;
    res.locals.fullYear=date.getFullYear();

    next();
  };
}

module.exports = { decorateHtmlResponse };
