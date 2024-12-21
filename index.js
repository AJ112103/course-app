require("./db");
const express = require("express");
const app = express();

const userRoute = require("./routes/User");
const adminRoute = require("./routes/Admin");
const courseRoute = require("./routes/Courses");

app.use(express.json());
app.use("/api/v1/user", userRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/course", courseRoute);

app.listen(3000, () => {
    console.log("listening on port 3000");    
});
