const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017")

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        lowercase: true
    },
    password: {
        type : String,
        required : true,
        lowercase: true
    },
    firstName: {
        type : String,
        required : true,
    },
    lastName: {
        type : String,
        required : true,
    }
})

const User = mongoose.model("User", userSchema);

module.exports = {User}