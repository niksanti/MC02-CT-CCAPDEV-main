const mongoose = require("mongoose")

let User = mongoose.model("User", {
    username : String,
    password : String,
    email : String,
    status : String
})


module.exports = User;
