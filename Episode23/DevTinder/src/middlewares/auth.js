const jwt = require("jsonwebtoken");
const User = require("../model/user");
const userAuth = async (req, res, next) => {
  try {
    const cookie = req.cookies;
    const { token } = cookie;
    if (!token) {
      throw new Error("token invalid");
    }
    const decodeToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decodeToken);
    const { _id } = decodeToken;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User does not exist");
    }
    // res.send(user);
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Invalid token:" + err);
  }
};

module.exports = {
  userAuth,
};
