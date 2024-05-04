const mongoose = require('mongoose');
const adminScema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    ISActive:{
        type:Boolean,
        require:true
    }
})
const admin = mongoose.model("adminRegister",adminScema);
module.exports = admin;