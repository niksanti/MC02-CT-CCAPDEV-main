// const mongoose = require('mongoose')
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); 

const app = express()

app.set('view engine','ejs')

app.get('/',(req,res) => {
    res.render("index")
})

// signin page
app.get('/signin', (req,res) => {
    res.render('views/signin');
})  

// access public folder
app.use('/public', express.static('public'));

// Start  the server
app.listen(3000,() => {
    console.log("App is listening on port 3000..")

})
