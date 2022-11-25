const mongoose = require("mongoose");
const DateOnly = require('mongoose-dateonly')(mongoose);


var post = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },
    
    date:{
        type: DateOnly,
        required: true
    },

    body:{
        type: String,
        required: true
    },
});


const usercase = mongoose.model("Cases", post);

module.exports =  usercase;
