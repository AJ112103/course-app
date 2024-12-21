const jwt = require("jsonwebtoken");
require("dotenv").config();

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

module.exports = userAuth;