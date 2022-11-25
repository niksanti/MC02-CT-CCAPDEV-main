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
      
      var email = req.body.email;
      let password = req.body.password;

    console.log("post login " + email);

    User.findOne({email: email}, function(err, Users){
        if(Users){
            let CheckPass = bcrypt.compareSync(password, Users.password );
            if(CheckPass){       
            console.log("loginsuccess ");
            req.session.name = Users.name;
            req.session.email = Users.email;
            req.session.loggedin = "true";
            res.render("index.ejs",{
                loggedin : req.session.loggedin,
                user : "Sign out",
              });
            }
        } else {
        console.log("login fail ");

        }
    });

});

router.post("/signout", urlencoder, (req, res) => {
    req.session.destroy();
          res.render("index.ejs",{
              loggedin : "false",
              user : "Sign out",
            });
});
module.exports = router;
