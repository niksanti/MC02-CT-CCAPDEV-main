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




app.use(
  bodyparser.urlencoded({
    extended: false,
  })
);


module.exports = router;
