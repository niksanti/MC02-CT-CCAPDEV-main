// const mongoose = require('mongoose')
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); 
const router = express.Router();

const app = express()

app.set('views', './views');
app.set('view engine','ejs');

app.get('/',(req,res) => {
    res.render("index")
})

// index / main page 
app.get('/index', (req,res) => {
    res.render('index');
})  

// signin page
app.get('/signin', (req,res) => {
    res.render('signin');
})  

// register page
app.get('/register', (req,res) => {
    res.render('register');
}) 

// access public folder
app.use('/public', express.static('public'));

// router.post('/register', function(req, res){
//     var username = req.body.username;
//     var password = req.body.password;
//     var firstname = req.body.firstname;
//     var lastname = req.body.lastname;

//     var newuser = new User();
//     newuser.username = username;
//     newuser.password = password;
//     newuser.firstname = firstname;
//     newuser.lastname = lastname;





//})

// Start  the server
app.listen(3000,() => {
    console.log("App is listening on port 3000..")

})
