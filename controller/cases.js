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

//new post
router.post("/create", urlencoder, (req, res) => {
    date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();

    let currdate = month+"/" + date+"/" + year ;

    res.render("createpost.ejs",{
        currdate : currdate,

    });


  console.log("creating post");

  
});

module.exports = router;
