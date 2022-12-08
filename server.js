const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); 
const mongoose = require("mongoose");


const router = express.Router();
const session = require("express-session");

// const passport = require("passport");
// const passportLocalMongoose = require("passport-local-mongoose");


const app = express();

app.use(
  session({
    secret: "very secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

// initialize passport (new)
//app.use(passport.initialize());
//app.use(passport.session());


app.set('views', './views');
app.set('view engine','ejs');

// access public folder
app.use('/public', express.static('public'));


// access controller folder
app.use(require("./controller"));

// connects to the mongoose database
mongoose.connect("mongodb+srv://Chants:marcoi06@covidtrack.exyg6bg.mongodb.net/CovidApp", {useNewUrlParser: true});

// uses plugin of LocalMongoose (new)
// userAccount.plugin(passportLocalMongoose);

// passport.use(User.createStrategy());

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());





app.set("view engine", "ejs");


// Start  the server
app.listen(3000,() => {
    console.log("App is listening on port 3000..")

})
