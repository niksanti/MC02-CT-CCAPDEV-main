const express = require("express");
const bodyparser = require("body-parser");
const router = express.Router();
const User = require("../models/usersModel");
const Cases = require("../models/caseModel");


const app = express();

const urlencoder = bodyparser.urlencoded({
  extended: false,
});


router.use(urlencoder);
date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();

let currdate = month+"/" + date+"/" + year ;

//new post
router.post("/create", urlencoder, (req, res) => {


    res.render("createpost.ejs",{
        name: req.session.name,
        currdate : currdate,
        loggedin : req.session.loggedin,
    });


  console.log("creating post");

  
});

//save post for approval
router.post("/submitpost", urlencoder, (req, res) => {
  let name = req.session.name;
  let email = req.session.email;
  let body = req.body.body;

  User.findOne({email: email}, function(err, Caseszxc){
      if(err)
          console.log(err);

  
          var CasesP = new Cases({
              email: email,
              name: name,
              date: currdate,
              textbody: body,

          })
          CasesP.save(function(err){
              if(err){
                  console.log(err);
              }else{
                  res.redirect('/')
              console.log("Submitting post");
                  
              }
          })
      });


  console.log("registering");

  
});

module.exports = router;
