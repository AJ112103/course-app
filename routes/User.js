const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

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

router.post("/signup", function(req, res){
    res.json({
        message: "User Signed Up"
    })
})

router.post("/signin", function(req, res){
    res.json({
        message: "User Sign In"
    })
})

router.use(userAuth);

router.get("/purchases", function(req, res){

})

module.exports = router