const { check, validationResult } = require("express-validator");
const loginValidator = [
  check("email").isLength({ min: 1 }).withMessage("email address require*"),
  check("password")
    .isLength({
      min: 8,
    })
    .withMessage("password require*"),
];
const loginValidatorHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mapedError = errors.mapped();
  //   console.log(mapedError.password.msg);
  if (Object.keys(mapedError).length === 0) {
    next();
  } else {
    // console.log(mapedError.email.msg)
    res.render("login", {
      data: req.body.email ,
      errors: mapedError,
    });
  }
};

module.exports = { loginValidator, loginValidatorHandler };
