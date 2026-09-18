const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register
const register = async(req,res) =>{
    try{
        const {name, email, password, role} = req.body;

        // checking the all fields are entered or not
        if(!name || !email || !password || !role){
            return res.status(400).json({
                message: "Please enter all fields..."
            });
        }

        // checking email are unique or already existed
        const isEmailThere = await User.findOne({email});

        if(isEmailThere){
            return res.status(400).json({
                message : "Email already existed... Please try another email..."
            });
        }

        // hashed password to store in db
        const hashedPass = await bcrypt.hash(password,10);

        const user = await User.create({
            name,
            email,
            password:hashedPass,
            role
        });

        return res.status(200).json({
            message:"Data added Successfully...",
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        });
    }catch(error){
        return res.status(500).json({
            message:error.message
        })
    }
}

// Login for user
const login = async(req, res) => {
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                message: "Please provide correct one..."
            })
        }
        // Finding email
        const findingemail = await User.findOne({email});

        if(!findingemail){
            return res.status(400).json({
                message: "Email not existed..."
            });
        }

        const comparingPass = await bcrypt.compare(password, findingemail.password);
        if(!comparingPass){
            return res.status(400).json({
                message : "Password is wrong..."
            });
        }

        const token =  jwt.sign({
            userId : findingemail._id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"3d"
        });

        return res.status(201).json({
            message:"Login success...",
            token,
            user:{
                id: findingemail._id,
                name:findingemail.name,
                email:findingemail.email,
                role:findingemail.role,
            }
        })

    }catch(error){
        return res.status(500).json({
            message:"Login Failed: ".error.message
        })
    }
}

module.exports = {register, login};