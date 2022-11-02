const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
  const cookie =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
  if (cookie) {
    try {
      const token = cookie[process.env.COOKIE_NAME];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (err) {
      console.log(err.message);
      res.redirect("/login");
    }
  } else {
    res.redirect("/login");
  }
};
const redirectLogtedIn = (req, res, next) => {
  const cookie =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
  if (cookie) {
    res.redirect("/home/");
  } else {
    next();
  }
};

const logOut = (req, res, next) => {
  const cookie =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

  if (cookie) {
    res.clearCookie(process.env.COOKIE_NAME);
    res.status(200).json({
      success: {
        msg: "User was deleted successfully!",
      },
    });
  } else {
    res.status(500).json({error:{
        msg:"Failed!"
    }});
  }
};
module.exports = { checkLogin, redirectLogtedIn, logOut };
