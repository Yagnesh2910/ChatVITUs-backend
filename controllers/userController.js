const User = require('../models/userSchema');
const jwt = require("jsonwebtoken");

const addUser = async (req,res) => {
    console.log(req.body);
    const newuser = new User(req.body);
    try{
        await newuser.save();
        res.status(200).json({
            message: "User added successfully",
        });
    }catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};

const verifyUser = async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({ msg: "No record existed" });
        if(user.password !== password){
            return res.status(400).json({ msg: "Incorrect password" });
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.json({msg:"Success", token, user:{_id: user._id, email:user.email}});
    }catch(error){
        res.status(500).json(error);
    }
};

const googleLogin = async(req, res) => {
    try{
        const {email, name} = req.body;
        let user = await User.findOne({email});

        if(!user){
            console.log("New Google user detected:", email);
            user = new User({
                name,
                email,
                password: "",
                googleLogin: true,});
            await user.save();
            console.log("User saved to MongoDB:", user);
        }

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:"1h"});
        res.json({success: true, token, user: { _id: user._id, email: user.email }});
    } catch(error){
        res.status(500).json({success: false, message:"Google login failed", error});
    }
};

module.exports = {addUser, verifyUser, googleLogin};