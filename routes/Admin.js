const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

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

router.post("/signup", function(req, res){

})

router.post("/signin", function(req, res){

})

router.use(adminAuth);

router.post("/course", function(req, res){

})

router.delete("/course", function(req, res){

})

router.put("/course", function(req, res){

})

router.get("/course/bulk", function(req, res){
    
})

module.exports = router;