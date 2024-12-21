const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { signupSchema, signinSchema } = require('../authSchemas');
const userModel = require('../db').UserModel;
const purchasesModel = require('../db').PurchasesModel;
const courseModel = require('../db').CourseModel;
const userAuth = require('../middleware/userAuth.js');

router.post("/signup", async function(req, res) {
  try {
    const parsedData = signupSchema.parse(req.body);
    const email = parsedData.email;
    const password = parsedData.password;
    const firstName = parsedData.firstName;
    const lastName = parsedData.lastName;
    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.create({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName
    });
    res.json({ message: "User Signed Up" });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/signin", async function(req, res) {
  try {
    const parsedData = signinSchema.parse(req.body);
    const email = parsedData.email;
    const password = parsedData.password;
    const isUser = await userModel.findOne({ email: email });
    if (!isUser) {
      return res.status(400).send("Invalid Credentials");
    }
    const validPassword = await bcrypt.compare(password, isUser.password);
    if (!validPassword) {
      return res.status(400).send("Invalid Credentials");
    }
    const token = jwt.sign(
      { _id: isUser._id, email: isUser.email },
      process.env.USER_TOKEN_SECRET
    );
    res.send(token);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.use(userAuth);

router.get("/purchases", async function(req, res) {
  try {
    const purchases = await purchasesModel.find({
       userId: req.user._id 
      });
    const courseContent = await courseModel.find({
      _id: { $in: purchases.map(purchase => purchase.courseId) }
    });
    res.json({
      message: "These are your purchased courses",
      purchases,
      courseContent
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
