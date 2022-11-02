const {check,validationResult}= require("express-validator");

const addValidator=[
    check("username")
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet")
];
const addUserValidationHandler = function (req, res, next) {
    const errors = validationResult(req);
    console.log(errors)
    const mappedErrors = errors.mapped();
    if (Object.keys(mappedErrors).length === 0) {
      next();
    } else {
      // remove uploaded files
      
  
      // response the errors
      res.status(500).json({
        errors: mappedErrors,
      });
    }
  };
module.exports={addValidator,addUserValidationHandler}