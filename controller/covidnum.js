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

router.post("/covidnumtest", urlencoder, (req, res) => {
      
            var dataC = new CovidNum({
                date:20221120,
            
                addcases:123,
            
                adddeath:213,
            
                addrecoveries:546,
            
                addsevere: 123,
            
  
            })
            dataC.save(function(err){
                if(err){
                    console.log(err);
                }else{
                    res.redirect('/daily')
                console.log("Sample data");
                    
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
          });
      }
    });
    console.log("post approval");

});



app.use(
  bodyparser.urlencoded({
    extended: false,
  })
);


module.exports = router;
