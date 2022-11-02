const {extname} = require("path");
const multer = require("multer");
//
const UPLOADED_FOLDER = `${__dirname}/../public/uploads/`;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOADED_FOLDER);
  },
  filename: (req, file, cb) => {
    const ext = extname(file.originalname);
    const customFileName =
      file.originalname.trim().replace(ext, "").split(" ").join("_") +
      "_" +
      Date.now() +
      ext;
      cb(null, customFileName)
  },
});
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only PNG & JPG & JPEG SUPORTED."));
    }
  },
  limits: 5194304, //5mb
});

module.exports = upload;
