const mongoose = require("mongoose");
const { type } = require("node:os");

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true
        },
        role:{
            type:String,
            enum:["student","admin","instructor"],
            default:"student"
        }
    },{timestamps:true}
);

module.exports = mongoose.model('User',userSchema);