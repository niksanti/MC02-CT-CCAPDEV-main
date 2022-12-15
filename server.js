require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); 
const mongoose = require("mongoose");


const router = express.Router();
const session = require("cookie-session");

// const passport = require("passport");
// const passportLocalMongoose = require("passport-local-mongoose");


const app = express();
const mongo = "mongodb+srv:" + process.env.DB_ACCESS;

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
mongoose.connect(mongo, {useNewUrlParser: true});

// uses plugin of LocalMongoose (new)
// userAccount.plugin(passportLocalMongoose);

// passport.use(User.createStrategy());

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


app.set("view engine", "ejs");


// Start  the server
app.listen(process.env.PORT || 3000, function() {
    console.log("App is listening on port 3000..");
})