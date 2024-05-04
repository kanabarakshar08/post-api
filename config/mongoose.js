const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1/task");
const db = mongoose.connection;
db.once('open',(err)=>{
    if(err){
        console.log("databse not connected..!");
    }
    else{
        console.log("database connected");
    }
})
module.exports = db