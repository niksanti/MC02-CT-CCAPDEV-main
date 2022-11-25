const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); 
const mongoose = require("mongoose")
const session = require("express-session");


const router = express.Router();

const app = express()

app.set('views', './views');
app.set('view engine','ejs');

// access public folder
app.use('/public', express.static('public'));


// access controller folder
app.use(require("./controller"));


mongoose.connect("mongodb+srv://Chants:marcoi06@covidtrack.exyg6bg.mongodb.net/CovidApp", {useNewUrlParser: true});


app.set("view engine", "ejs");

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
  

// Start  the server
app.listen(3000,() => {
    console.log("App is listening on port 3000..")

})
