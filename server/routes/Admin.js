const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { signupSchema, signinSchema } = require('../authSchemas');
const adminModel = require('../db').AdminModel;
const courseModel = require('../db').CourseModel;
const adminAuth = require('../middleware/adminAuth');

router.post("/signup", async function(req, res){
  try {
    const parsedData = signupSchema.parse(req.body);
    const email = parsedData.email;
    const password = parsedData.password;
    const firstName = parsedData.firstName;
    const lastName = parsedData.lastName;
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new adminModel({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName
    });
    await admin.save();
    res.json({ message: "Admin Signed Up" });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/signin", async function(req, res){
  try {
    const parsedData = signinSchema.parse(req.body);
    const email = parsedData.email;
    const password = parsedData.password;
    const isAdmin = await adminModel.findOne({ email: email });
    if (!isAdmin) {
      return res.status(400).send("Invalid Credentials");
    }
    const validPassword = await bcrypt.compare(password, isAdmin.password);
    if (!validPassword) {
      return res.status(400).send("Invalid Credentials");
    }
    const token = jwt.sign(
      { _id: isAdmin._id, email: isAdmin.email },
      process.env.ADMIN_TOKEN_SECRET
    );
    res.header('token', token).send(token);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.use(adminAuth);

router.post("/course", async function(req, res){
  try {
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
    await course.save();
    res.json({ 
      message: "Course Created",
      courseId: course._id
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete("/course", async function(req, res){
  try {
    const courseId = req.body.courseId;
    const deleted = await courseModel.deleteOne({
      _id: courseId,
      creatorId: req.admin._id
    });
    if (deleted.deletedCount === 0) {
      return res.status(403).send("You are not authorized to delete this course");
    }
    res.json({ message: "Course Deleted" });
  } catch (err) {
    res.status(400).send("Failed to delete course");
  }
});

router.put("/course", async function(req, res){
  try {
    const courseId = req.body.courseId;
    const newTitle = req.body.title;
    const newDescription = req.body.description;
    const newPrice = req.body.price;
    const newImageUrl = req.body.imageUrl;
    const updated = await courseModel.updateOne(
      { _id: courseId, creatorId: req.admin._id },
      {
        title: newTitle,
        description: newDescription,
        price: newPrice,
        imageUrl: newImageUrl
      }
    );
    if (updated.matchedCount === 0) {
      return res.status(403).send("You are not authorized to update this course");
    }
    res.json({ message: "Course Updated" });
  } catch (err) {
    res.status(400).send("Failed to update course");
  }
});

router.get("/course/bulk", async function(req, res){
  try {
    const courses = await courseModel.find({ creatorId: req.admin._id });
    res.json(courses);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
