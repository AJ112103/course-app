const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const courseModel = require('../db').CourseModel;

router.post("/purchase", function(req, res){
    const courseId = req.body.courseId;
    const userId = req.user._id;

    const purchase = new purchasesModel({
        courseId: courseId,
        userId: userId
    });

    res.json({
        message: "Course Purchased"
    })
})

router.get("/preview", function(req, res){
    const courses = courseModel.find();
    res.json(courses);
})

module.exports = router;