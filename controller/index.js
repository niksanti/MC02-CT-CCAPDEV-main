const express = require("express");

const session = require("express-session");
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const router = express.Router();

const app = express();

const urlencoder = bodyparser.urlencoded({
  extended: false,
});


router.use("/users", require("./users"));
router.use("/cases", require("./cases"));


const User = require("../models/usersModel");
const Cases = require("../models/caseModel");



router.get("/", function (req, res) {
    res.render("index.ejs");
    console.log("index");

});


router.get("/daily", function (req, res) {
    res.render("daily.ejs");
    console.log("dailycheck");

});


router.get("/weekly", function (req, res) {
    res.render("weekly.ejs");
    console.log("weekly");

});


router.get("/posts", function (req, res) {
    res.render("posts.ejs");
    console.log("posts");

});

router.get("/signin", function (req, res) {
    res.render("signin.ejs", {
        // title : 'CRUD Operation using NodeJS / ExpressJS / MySQL',
    });
    console.log("sign in");

});


router.get("/register", function (req, res) {
  res.render("register.ejs", {
    error: '',
  
  });
  console.log("register");

});




app.use(
  bodyparser.urlencoded({
    extended: false,
  })
);

module.exports = router;
