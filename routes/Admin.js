const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const adminModel = require('../db').AdminModel;
const courseModel = require('../db').CourseModel;

function adminAuth(req, res, next){
    const token = req.headers.token;
    if(!token){
        return res.status(401).send("Access Denied");
    }
    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.admin = verified;
        next();
    }catch(err){
        res.status(400).send("Invalid Token");
    }
}

router.post("/signup", function(req, res){
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const admin = new adminModel({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    });

    res.json({
        message: "Admin Signed Up"
    })
})

router.post("/signin", function(req, res){
    const email = req.body.email;
    const password = req.body.password;

    const isAdmin = adminModel.findOne({
        email: email,
        password: password
    });

    if(isAdmin){
        const token = jwt.sign({
            email: email,
            password: password
        }, process.env.TOKEN_SECRET);
        res.header('token', token).send(token);
    } else {
        res.status(400).send("Invalid Credentials");
    }
})

router.use(adminAuth);

router.post("/course", function(req, res){
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;

    const course = new courseModel({
        title: title,
        description: description,
        price: price,
        imageUrl: imageUrl,
        creatorId: req.admin._id
    });
})

router.delete("/course", function(req, res){
    const courseId = req.body.courseId;

    courseModel.deleteOne({
        _id: courseId
    }, 
    function(err){
        if(err){
            res.status(400).send("Failed to delete course");
        } else {
            res.json({
                message: "Course Deleted"
            });
        }
    })
    
})

router.put("/course", function(req, res){
    const courseId = req.body.courseId;
    const newTitle = req.body.title;
    const newDescription = req.body.description;
    const newPrice = req.body.price;
    const newImageUrl = req.body.imageUrl;

    courseModel.updateOne({
        _id: courseId,
        title: newTitle,
        description: newDescription,
        price: newPrice,
        imageUrl: newImageUrl
    })
})

router.get("/course/bulk", function(req, res){
    const courses = courseModel.find({
        creatorId: req.admin._id
    });
})

module.exports = router;