const express = require("express");
const bodyparser = require("body-parser");
const router = express.Router();
const User = require("../models/usersModel");
const Cases = require("../models/caseModel");
const ACases = require("../models/approvedcaseModel");
const CovMod = require("../models/covidnumModel");
const CovModW = require("../models/covidnumModel-weekly");





const app = express();

const urlencoder = bodyparser.urlencoded({
  extended: false,
});


router.use(urlencoder);
date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

let currdate = month+"/" + date+"/" + year ;

//new post
router.post("/create", urlencoder, (req, res) => {


    res.render("createpost.ejs",{
        name: req.session.name,
        currdate : currdate,
        loggedin : req.session.loggedin,
        role : req.session.role,
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
                  res.redirect('/posts')
              console.log("Submitting post");
                  
              }
          })
      });


  console.log("submitting post");

  
});


//delete post
router.post("/deletepost", urlencoder, (req, res) => {
  
  let body = req.body.bodytext;
  console.log(body + "bodytext meaning");

  ACases.deleteOne({textbody: body}, function(err){
   console.log("deleted");
  });

  res.redirect('/posts')

  console.log("deleting");

  
});

//delete post from approval
router.post("/deletepostapp", urlencoder, (req, res) => {
  
  let body = req.body.bodytext;
  console.log(body + "bodytext meaning");

  Cases.deleteOne({textbody: body}, function(err){
   console.log("deleted");
  });

  res.redirect('../cases/approval')

  console.log("deleting");

  
});

//redirecting to approve cases
router.get("/approval", urlencoder, (req, res) => {
    Cases.find({}, function(err, rows) {
      if (err){
          console.log(err);
      } else {
          res.render('caseapproval.ejs', {
              loggedin : req.session.loggedin,
              cases : rows,
              email : req.session.email,
              role : req.session.role,
          });
      }
    });
    console.log("post approval");

});


router.post("/approve", urlencoder, (req, res) => {
  let names = req.body.name;
  let emails = req.body.email;
  let body = req.body.bodytext;

  User.findOne({email: emails}, function(err, Caseszxc){
      if(err)
          console.log(err);

  
          var CasesP = new ACases({
              email: emails,
              name: names,
              date: currdate,
              textbody: body,

          })
          CasesP.save(function(err){
              if(err){
                  console.log(err);
              }else{
                  res.redirect('/posts')
              console.log("Submitting post");
                  
              }
          })

          Cases.deleteOne({textbody: body}, function(err){
           
            console.log("deleted");
           });
      });

    

  console.log("submitting post");
  console.log("post approval");

});

//edit post
router.post("/editpost", urlencoder, (req, res) => {
    let textbody = req.body.bodytext;

    ACases.deleteOne({textbody: textbody}, function(err){
           
        console.log("deleted");
       });

    res.render("editpost.ejs",{
        name: req.session.name,
        currdate : currdate,
        loggedin : req.session.loggedin,
        body: textbody,
    });

  console.log("creating post");

  
});


//upd post
router.post("/updpost", urlencoder, (req, res) => {
    let name = req.session.name;
    let email = req.session.email;
    let body = req.body.body;
  
    User.findOne({textbody: body}, function(err, Caseszxc){
        if(err)
            console.log(err);
  

            var CasesP = new ACases({
                email: email,
                name: name,
                date: currdate,
                textbody: body,
  
            })
            CasesP.save(function(err){
                if(err){
                    console.log(err);
                }else{
                    res.redirect('/posts')
                console.log("Submitting post");
                    
                }
            })
        });
  
  
    console.log("submitting post");
  
    
  });



  router.post("/search", urlencoder, (req, res) => {
    let searchdate = req.body.searchdate;
    console.log(searchdate);
    CovMod.findOne({date: searchdate}, function(err, Caseszxc){
        if(err){
            console.log(err);
        }
        else if(Caseszxc){
        res.render('daily-results.ejs', {
            loggedin : req.session.loggedin,
            role : req.session.role,
            
            CovidNum : Caseszxc,
          });
          console.log(Caseszxc);
        }
        else
        res.render('daily-results-invalid.ejs', {
            loggedin : req.session.loggedin,
            role : req.session.role,
            
        });
        
  
      
  
    console.log("submitting post");
    console.log("post approval");
  
  });
});


router.post("/searchweek", urlencoder, (req, res) => {
    let weeknum = req.body.searchweek;
 
    CovModW.findOne({weeknum: weeknum}, function(err, Caseszxc){
        if(err){
            console.log(err);
        }
        else if(Caseszxc){
        res.render('weekly-results.ejs', {
            loggedin : req.session.loggedin,
            role : req.session.role,
            month: monthNames[month-1],
            CovidNumW : Caseszxc,
          });
          console.log(Caseszxc);
        }
        else
        res.render('daily-results-invalid.ejs', {
            loggedin : req.session.loggedin,
            role : req.session.role,
            
        });
        
  
      
  
    console.log("submitting post");
    console.log("post approval");
  
  });
});

module.exports = router;
