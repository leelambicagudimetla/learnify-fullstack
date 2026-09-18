const express = require("express");
const {createCourse} = require("../controllers/courseControllers");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/course",authMiddleware,createCourse);

module.exports = router;