const courseModel = require("../models/Course");
const lessonModel = require("../models/Lesson");

const createCourse = async(req,res)=>{
    try{
        const{title,description,price,thumbnail}=req.body;

        //all fields are required
        if(!title || !description ){
            return res.status(400).json({
                message:"All fields are required"
            });
        };

        //create a course
        const course = await courseModel.create({
            title,
            description,
            instructor : req.user._id,   // ← from the logged-in user, not req.body,
            // req.user._id in protectMiddleware/createCourse = "who is currently logged in?" → a User id
            price,
            thumbnail,
        });
        return res.status(201).json({
            message:"course created succesfully",
            course:{
                _id:course._id,
                title:course.title,
                description:course.description,
                instructor:course.instructor,
                price:course.price,
                thumbnail:course.thumbnail,
            }
        });
    }catch(error){
        return res.status(500).json({
            message:error.message
        });
    };
};

module.exports={createCourse};