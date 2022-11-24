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

// daily page
app.get('/daily', (req,res) => {
    res.render('daily');
})  

// weekly page
app.get('/weekly', (req,res) => {
    res.render('weekly');
})

// posts page
app.get('/posts', (req,res) => {
    res.render('posts');
})

// access public folder
app.use('/public', express.static('public'));

// Start  the server
app.listen(3000,() => {
    console.log("App is listening on port 3000..")

})
