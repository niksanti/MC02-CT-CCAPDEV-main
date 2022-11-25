const express = require("express");
const bodyparser = require("body-parser");
const router = express.Router();
const User = require("../models/usersModel");
const bcrypt = require("bcrypt");


const app = express();

const urlencoder = bodyparser.urlencoded({
  extended: false,
});

router.use(urlencoder);

//register
router.post("/save", urlencoder, (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.pass;

  var salt = bcrypt.genSaltSync(10)
  var hash = bcrypt.hashSync(password, salt);

  User.findOne({email: email}, function(err, Users){
      if(err)
          console.log(err);

      if(Users){
          res.render('register.ejs', {
              error: 'Email has been already taken! Try Again!',
          });
      }else{
          var Users = new User({
              name: name,
              password: hash,
              email: req.body.email,
          })
          Users.save(function(err){
              if(err){
                  console.log(err);
              }else{
                  res.redirect('/')
              console.log(email + " is registering");
                  
              }
          })
      }
  })


  console.log("registering");

  
});

router.post("/login", urlencoder, (req, res) => {
    
    console.log(req.body.un + " is the username");
  
    let user = {
      email: req.body.email,
      password: req.body.pass,
    };
    console.log("post login " + req.body.un);
    // console.log("post login " + user)
  
    User.login(user).then(
      (newUser) => {
        // console.log("authenticate " + newUser)
        if (newUser) {
          console.log("trying to login");
          req.session.username = user.username;
          req.session.password = user.password;
          User.getCases().then(
            (cases) => {
              // console.log("authenticate " + newUser)
              if (cases) {
                console.log("cases scraped");
                recovered = cases.recovered;
                total = cases.total;
                death = cases.deaths;
                if (req.session.username) {
                  console.log("/2");
                  //it means that user has already signed in
                  //go to home.html
                  res.render("loggedin-index.hbs", {
                    recovered: recovered,
                    total: total,
                    death: death,
                  });
                } else {
                  //the user has not logged in
                  console.log("is scraped? " + recovered);
                  res.render("index.hbs", {
                    recovered: recovered,
                    total: total,
                    death: death,
                  });
                }
              } else {
                console.log("error scraping");
              }
            },
            (error) => {
              console.log("error scraping in: " + error);
            }
          );
        } else {
          res.render("login-page2.hbs", {
            error: "Username and password does not match", //ilalagay toh as {{error}} dun sa login-page2.js
          });
        }
      },
      (error) => {
        console.log("error logging in: " + error);
      }
    );
  });


module.exports = router;
