const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

mongoose.connect(process.env.DB_CONNECTION);

const userRoute = require("./routes/User");
const adminRoute = require("./routes/Admin");
const courseRoute = require("./routes/Courses");

app.use("/api/v1/user", userRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/course", courseRoute);

app.listen(3000, () => {
    console.log("server is running");    
});

