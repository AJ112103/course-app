const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const courseModel = require('../db').CourseModel;
const purchasesModel = require('../db').PurchasesModel;
const { z } = require('zod');

function userAuth(req, res, next) {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).send("Access Denied");
  }
  try {
    const verified = jwt.verify(token, process.env.USER_TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
}

const purchaseSchema = z.object({
  courseId: z.string(),
});

router.get("/preview", async function(req, res){
  try {
    const courses = await courseModel.find();
    res.json(courses);
  } catch (err) {
    res.status(500).send("Could not fetch courses");
  }
});

router.post("/purchase", userAuth, async function(req, res){
  try {
    const parsedData = purchaseSchema.parse(req.body);
    const courseId = parsedData.courseId;
    const userId = req.user._id;
    await purchasesModel.create({ courseId, userId });
    res.json({ message: "Course Purchased" });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;