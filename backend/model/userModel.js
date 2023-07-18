const mongoose = require('mongoose');

userSchema = new mongoose.Schema({
    username:{
        type : String,
        required :true,
        min : 4,
        max : 20,
        unique : true
    },
    email:{
        type : String,
        required :true,
        max : 50,
        unique : true
    },
    password:{
        type : String,
        required :true,
        min : 8
    },
    isAvatarImgSet:{
        type : Boolean,
        default : false
    },
    avatarImg :{
        type : String,
        default : ""
    }
});

module.exports = mongoose.model("users",userSchema);