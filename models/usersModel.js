const mongoose = require("mongoose")

var userAccount = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },
    
    role: {
        type: String,
        default: "User",
    },

});


const user = mongoose.model("User", userAccount);

module.exports =  user;
