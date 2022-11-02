// external import's
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
//internal import's
const { notFound, defaultError } = require("./middleware/error.js");
const loginRouter = require("./Router/loginRouter");
const signUp = require("./Router/signUpRouter");
const indexPage = require("./Router/indexPage");
const landingRouter= require("./Router/landingPage");
const {decorateHtmlResponse}=require("./middleware/common/decodedHtml");
//
// built-in middleware
dotenv.config();
// db connection here
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("DataBase Cnnection Successfull!"))
  .catch((err) => console.log(err, "Db Error"));
//
const app = express();

app.use(express.static(`${__dirname}/public/`)); // for static acites
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.set("view engine", "ejs");
//
app.use("/", landingRouter);
app.use("/home", indexPage);
app.use("/login", loginRouter);
app.use("/reg", signUp);
//
app.use(decorateHtmlResponse("Not_Found"),notFound);    
app.use(decorateHtmlResponse("error_page"),defaultError);

app.listen(process.env, () => {
  console.log("App listen on 5000");
});
