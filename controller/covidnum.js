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
  CovidNum.find({}).sort({date: -1}).exec(function(err, rows) {
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
      if(err){
          console.log(err);
      } else if (Caseszxc){
res.render('covid_add',{
  err: 'Date Already Exists!',
})

      }else{

  
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
  }
      });


  console.log("submitting post");

  
});

router.post("/adddataweekly", urlencoder, (req, res) => {
  let weeknum = req.body.weeknum;
  let cases = req.body.addcases;
  let death = req.body.adddeath;
  let rec = req.body.addrec;
  let sev = req.body.addsev;



  CovidNumW.findOne({weeknum: weeknum}, function(err, Caseszxc){
      if(err){
          console.log(err);
      }else if (Caseszxc){
        res.render('covid_add-weekly',{
          err: 'Week number Already Exists!',
        })
      }else {

  
          var CasesD = new CovidNumW({
              weeknum: weeknum,
              addcases: cases,
              adddeath: death,
              addrecoveries: rec,
              addsevere:sev,

          })
          CasesD.save(function(err){
              if(err){
                  console.log(err);
              }else{
                  res.redirect('/adminweekly')
              console.log("Submitting data");
                  
              }
          })
  }
      });


  console.log("submitting post");

  
});

router.get("/addcases", urlencoder, (req, res) => {
  res.render('covid_add',{
    err: '',
  })
  
});


router.get("/addcasesweekly", urlencoder, (req, res) => {
  res.render('covid_add-weekly',{
    err: '',
  })
    
  });
app.use(
  bodyparser.urlencoded({
    extended: false,
  })
);


//delete post
router.get("/deletedata/:date",urlencoder, (req, res) => {
  
  const date = req.params.date;
  console.log(date);
  if ( Object.prototype.toString.call(date) === "[object Date]") {

  CovidNum.deleteOne({date: date}, function(err){
   console.log("deleted");
   res.redirect('/admin')
  });
  } else {
  CovidNumW.deleteOne({weeknum: date}, function(err){
    console.log("deleted weekly");
    res.redirect('/adminweekly')
   });
  }


  
  
});


//edit post
router.post("/editdata",urlencoder, (req, res) => {
  

  const date = req.body.date;
  console.log(date);
  const query = { date: date };
    const addcases = req.body.addcases;
    const adddeath = req.body.adddeath;
    const addrec = req.body.addrec;
    const addsev = req.body.addsev;

    CovidNum.updateOne(query, { addcases: addcases, adddeath: adddeath, addrecoveries: addrec,addsevere: addsev, }, function(err, result) {
        if(err){
            console.log(err);
          } else {
           res.redirect('/admin');
          }
        })
  
  
});


//edit post
router.post("/editdataweekly",urlencoder, (req, res) => {
  

  const weeknum = req.body.weeknum;

  const query = { weeknum: weeknum };
    const addcases = req.body.addcases;
    const adddeath = req.body.adddeath;
    const addrec = req.body.addrec;
    const addsev = req.body.addsev;

    CovidNumW.updateOne(query, { addcases: addcases, adddeath: adddeath, addrecoveries: addrec,addsevere: addsev, }, function(err, result) {
        if(err){
            console.log(err);
          } else {
           res.redirect('/adminweekly');
          }
        })
  
  
});



//edit post
router.get("/editdataren/:date",urlencoder, (req, res) => {
  const date = new Date(req.params.date);
  let day = date.getDate();
  console.log(day); // 23
  
  let month = date.getMonth() + 1;
  console.log(month + 1); // 8
  
  let year = date.getFullYear();
  console.log(year); // 2022

  let format4 = year + "-" + month + "-" + day;
console.log(format4); // 23-7-2022

  console.log(date + ' test')
  res.render('covid_edit',{
    err: '',
    covidnumdate:format4,
  })
  
});


//edit post
router.get("/editdatarenweekly/:weeknum",urlencoder, (req, res) => {
  const date =req.params.weeknum;
  
  console.log(date + ' test')
  res.render('covid_edit-weekly',{
    err: '',
    covidnumdate:date,
  })
  
});



module.exports = router;
