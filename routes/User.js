const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userModel = require('../db').UserModel;
const purchasesModel = require('../db').PurchasesModel;

function userAuth(req, res, next){
    const token = req.headers.token;
    if(!token){
        return res.status(401).send("Access Denied");
    }
    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
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

    const user = new userModel({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    });

    res.json({
        message: "User Signed Up"
    })
})

router.post("/signin", function(req, res){
    const isUser = userModel.findOne({ 
        email: req.bdoy.email, 
        password: req.body.password 
    });
    if(isUser){
        const token = jwt.sign({ 
            email: req.body.email, 
            password: req.body.password 
        }, process.env.TOKEN_SECRET);
        res.header('token', token).send(token);
    } else {
        res.status(400).send("Invalid Credentials");
    }
    res.json({
        message: "User Sign In"
    })
})

router.use(userAuth);

router.get("/purchases", function(req, res){
    const purchases = purchasesModel.find({ 
        userId: req.user._id 
    });
    
    res.json(purchases);
})

module.exports = router