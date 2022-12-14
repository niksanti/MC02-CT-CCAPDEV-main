const express = require("express");

const session = require("express-session");
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const router = express.Router();

const app = express();

const urlencoder = bodyparser.urlencoded({
  extended: false,
});


const User = require("../models/usersModel");
const ACases = require("../models/approvedcaseModel");
const Cases = require("../models/caseModel");
const CovidNum = require("../models/covidnumModel");
const CovidNumW = require("../models/covidnumModel-weekly");



// Add Sample Data
 const sampleData = ((req,res) =>{   
        
        
  User.findOne({name:"admin"}, function(err, data){
      if(!data){

          //the password of sample accounts is 12345678
          User.insertMany([
           { email: "admin@admin",
            password: "$2b$10$qF9cyybIkHoXYdkLS1FpK.bdaS5DrcgrvicOpRC2KNhyQEZKHH302",

                              name: "admin", 
                              role: "Admin"},

                              {name: "Nik Sants", 
                              password: "123",
                              email: "Niks@gmail.com",
                              role: "User"},

                              {name: "Jam Ser", 
                              password: "123",
                              email: "Jams@gmail.com",
                              role: "User"},

                              {name: "Jam Sants", 
                              password: "123",
                              email: "JamSan@gmail.com",
                              role: "User"},

                              {name: "Nik Ser", 
                              password: "123",
                              email: "NikSer@gmail.com",
                              role: "User"},
          ])
        
                              
          console.log("Admin+user data is added");

          
  ACases.findOne({textbody: "I currently have a fever and just tested positive on my swab test."}, function(err,datacase){
    if(!datacase){
      ACases.insertMany([
        { 
                          email: "earn@gmail.com",
                           name: "Earn Marks",
                           date:20220220, 
                           textbody:"I currently have a fever and just tested positive on my swab test."},

                           {email: "toitoitoit@gmail.com",
                           name: "Jake Peralta",
                           date:20221020, 
                           textbody:"I gots the cold and it seems like I just tested positive on my RTCPERDSASDFSA test"},

                           {email: "Morty_smith@gmail.com",
                           name: "Morty Smith",
                           date:20220920, 
                           textbody:"Not feeling so good. Im not sure how long this will last but I wish it ends soon."},

                           {email: "Marina_summersg@gmail.com",
                           name: "Marina Summers",
                           date:20220520, 
                           textbody:"Today I am positive that I have covid."},

                          {email: "jopay@gmail.com",
                           name: "Joe Pay",
                           date:20191220, 
                           textbody:"What if my health comes back? I would like to believe that I'll get better."},
       ])
    }
  });

  Cases.findOne({textbody: "Testing case"}, function(err,datacases){
    if(!datacases){
      Cases.insertMany([
        { 
                          email: "chadaesan@gmail.com",
                           name: "Cha Sants",
                           date:20221220, 
                           textbody:"Testing case"},

                           {email: "toitoitoit@gmail.com",
                           name: "Jake Peralta",
                           date:20221020, 
                           textbody:"I gots the co"},

                           {email: "Morty_smith@gmail.com",
                           name: "Morty Smith",
                           date:20220920, 
                           textbody:"Im not sure what to put here.. what do i say?"},

                           {email: "Marina_summersg@gmail.com",
                           name: "Marina Summers",
                           date:20220520, 
                           textbody:"Testing 1 2 3"},

                          {email: "jopay@gmail.com",
                           name: "Joe Pay",
                           date:20211220, 
                           textbody:"SpaghettingPababa"},
       ])
    }
  });
      }

  });

 });

 module.exports = {sampleData};
