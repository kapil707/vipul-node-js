const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    }
});


const uu = mongoose.model('user',userSchema);

module.exports = uu;