const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileFields } = require("../utils/validation");
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileFields) {
      throw new Error("Edit not allowed");
    }
    const user = req.user;
    Object.keys(req.body).forEach((k) => (user[k] = req.body[k]));
    user.save();
    res.status(200).send(`${user.firstName},your profile updated successfully`);
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});
module.exports = profileRouter;
