const mongoose = require("mongoose");
const DateOnly = require('mongoose-dateonly')(mongoose);


var records = new mongoose.Schema({   
    weeknum:{
        type: Number,
        required: true
    },

    addcases:{
        type: Number,
        required: true
    },

    adddeath:{
        type: Number,
        required: true
    },

    addrecoveries:{
        type: Number,
        required: true
    },

    addsevere:{
        type: Number,
        required: true
    },


});


const chartrec= mongoose.model("chartrecord-weekly", records);

module.exports =  chartrec;
