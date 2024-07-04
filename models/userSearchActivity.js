const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    search_type:{
        type:String,
        required:true,
    }
});


const user_search_activity = mongoose.model('user_search_activity',userSchema);

module.exports = user_search_activity;