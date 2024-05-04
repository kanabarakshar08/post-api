const mongoose = require('mongoose');
const postScema = mongoose.Schema({
    Title:{
        type:String,
        required:true
    },
    Body:{
        type:String,
        required:true
    },
    Created_by:{
        type:String,
        required:true
    },
    location:{
        type:{type:String,required:true},
        coordinates:[]
    },
    ISActive:{
        type:Boolean,
        require:true
    }
})
postScema.index({Location:"2dsphere"});

const post = mongoose.model("post",postScema);
module.exports = post;