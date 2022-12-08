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
const ACases = require("../models/approvedcaseModel");
const Cases = require("../models/caseModel");
const CovidNum = require("../models/covidnumModel");
const CovidNumW = require("../models/covidnumModel-weekly");


router.get("/covidnumtest", urlencoder, (req, res) => {
      
            // var dataC = new CovidNum({
            //     date:20221120,
            
            //     addcases:123,
            
            //     adddeath:213,
            
            //     addrecoveries:546,
            
            //     addsevere: 123,
            // })
            // dataC.save(function(err){
            //     if(err){
            //         console.log(err);
            //     }else{
            //         res.redirect('/daily')
            //     console.log("Sample data");
                    
            //     }
            // })

            var dataB = new CovidNumW({
              weeknum:2,
          
              addcases:123,
          
              adddeath:213,
          
              addrecoveries:546,
          
              addsevere: 123,
          

          })
          dataB.save(function(err){
              if(err){
                  console.log(err);
              }else{
                  res.redirect('/daily')
              console.log("Sample data for week");
                  
              }
          })
  
  
    console.log("submitting data");
  
    
  });
  

//covidnumber choosing
router.get("/getdata", urlencoder, (req, res) => {
    CovidNum.find({}, function(err, rows) {
      if (err){
          console.log(err);
      } else {
          res.render('daily.ejs', {
              loggedin : req.session.loggedin,
              CovidNum : rows,
              role : req.session.role,
          });
      }
    });
    console.log("post approval");

});

router.post("/adddata", urlencoder, (req, res) => {
  let date = req.body.date;
  let cases = req.body.addcases;
  let death = req.body.adddeath;
  let rec = req.body.addrec;
  let sev = req.body.addsev;



  CovidNum.findOne({date: date}, function(err, Caseszxc){
      if(err)
          console.log(err);

  
          var CasesD = new CovidNum({
              date: date,
              addcases: cases,
              adddeath: death,
              addrecoveries: rec,
              addsevere:sev,

          })
          CasesD.save(function(err){
              if(err){
                  console.log(err);
              }else{
                  res.redirect('/admin')
              console.log("Submitting data");
                  
              }
          })
      });


  console.log("submitting post");

  
});

router.get("/addcases", urlencoder, (req, res) => {
res.render('covid_add')
  
});

app.use(
  bodyparser.urlencoded({
    extended: false,
  })
);

router.get("/sort", urlencoder, (req, res) => {
 
    res.redirect('/admin')
  });


//delete post
router.get("/deletedata/:date",urlencoder, (req, res) => {
  
  const date = req.params.date;
  console.log(date);
  
  CovidNum.deleteOne({date: date}, function(err){
   console.log("deleted");
  });

  res.redirect('/admin')

  
  
});



module.exports = router;
