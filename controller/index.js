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

    res.render("index.ejs",{
      loggedin : req.session.loggedin,
    });
    console.log("index");
    // console.log(req.session.name);


});


router.get("/daily", function (req, res) {
 

    res.render("daily.ejs",{
      loggedin : req.session.loggedin,
    });
    console.log("dailycheck");

});


router.get("/weekly", function (req, res) {
  

    res.render("weekly.ejs",{
      loggedin : req.session.loggedin,
    });
    console.log("weekly");

});


router.get("/posts", function (req, res) {

  Cases.find({}, function(err, rows) {
    if (err){
        console.log(err);
    } else {
        res.render('posts', {
            loggedin : req.session.loggedin,
            cases : rows
        });
    }
  });
    // res.render("posts.ejs",{

    // });
    console.log("posts");

});

router.get("/signin", function (req, res) {
  
    res.render("signin.ejs", {

    });
    console.log("sign in");

});


router.get("/register", function (req, res) {
  res.render("register.ejs", {
    error: '',
  
  });
  console.log("register");

});

router.get("/signout", urlencoder, (req, res) => {
  req.session.destroy();
    res.render("index.ejs",{
      loggedin: false,
    });
    console.log("index signout");

});



app.use(
  bodyparser.urlencoded({
    extended: false,
  })
);

module.exports = router;
