const multer= require("multer");
const notFound = (req, res, next) => {
  res.render("notFound");
};
const defaultError = (err, req, res, next) => {
  if (err) {
    if (err instanceof multer.MulterError) {
      res.send(`<h4 style="color:red;">Multer Error:${err}</h4>`);
    }
    console.log(err);
    res.send(err.message);
    // next(err.message);
  }
};

module.exports = { notFound, defaultError };
