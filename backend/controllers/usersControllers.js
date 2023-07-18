const bcrypt = require('bcrypt');
const User = require("../model/userModel");
const axios = require('axios')

module.exports.register = async (req,res,next) => {
    try {
        let {username,email,password,} = req.body;
        if (await User.findOne({username})) {
            return res.json({msg:'username already exist',status:false});
        } else if (await User.findOne({email})) {
            return res.json({msg:'email already used',status:false});
        }
        let passwordHash = await bcrypt.hash(password,10);
        let avatar = `https://api.dicebear.com/6.x/adventurer/svg?seed=${username.replace(/\s/g, "")}`
        const user = await User.create({
            email,
            username,
            password : passwordHash,
            avatarImg : avatar
            });
        delete user.password;
        return res.json({status : true,user});
    }  catch(err){
        next(err);
    }  
};


module.exports.login = async (req,res,next) => {
    try {
        let {username,password} = req.body;
        const user = await User.findOne({username});
        if (!user) {
            return res.json({msg:'Incorrect username or password',status:false});
        } 
        
        let passwordValid = await bcrypt.compare(password,user.password);

        if (!passwordValid) {
            return res.json({msg:'Incorrect username or password',status:false});
        }
        delete user.password;
        return res.json({status : true,user});
    }  catch(err){
        next(err);
    }  
};
