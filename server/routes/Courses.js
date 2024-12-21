const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const courseModel = require('../db').CourseModel;
const purchasesModel = require('../db').PurchasesModel;
const { z } = require('zod');
const userAuth = require('../middleware/userAuth');

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