const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECTION);

const app = express();

function userAuth(req, res, next){
    const token = req.headers["authorization"];
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

function adminAuth(req, res, next){
    const token = req.headers["authorization"];
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

app.post("/user-signup", function(req, res){

})

app.post("/user-signin", function(req, res){

})

app.post("/buy-course", function(req, res){

})

app.get("/my-course", function(req, res){

})

app.post("/admin-signup", function(req, res){

})

app.post("/admin-signin", function(req, res){

})

app.post("/courses", function(req, res){

})

app.delete("/courses", function(req, res){

})


