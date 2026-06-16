const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../model/connectionRequest");
const User = require("../model/user");
requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      //think about all the corner cases before writing any schema or api -
      //loggedin suser should be able to send request
      //from user and to user should be present in users
      // status should not be other than interested ignore
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;
      const allowedStatus = ["interested", "ignore"];
      if (!allowedStatus.includes(status)) {
        throw new Error("Status is invalid");
      }
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        res.status(404).json({ message: "User not found" });
      }
      const exisitingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          {
            fromUserId,
            toUserId,
          },
          {
            fromUserId: toUserId,
            toUserId: fromUserId,
          },
        ],
      });
      if (exisitingConnectionRequest) {
        res.status(400).send("COnnection Request is invalid");
      }
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();
      res.json({
        message: "Connection sent successfully",
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR : " + err);
    }
  }
);
requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;
      const allowedStatus = ["accepted", "ignore"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Status is invalid" });
      }
      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });
      if (!connectionRequest) {
        return res
          .status(400)
          .json({ message: "Connection Request is invalid" });
      }
      connectionRequest.status = status;
      //save() posting data should always be at last -think of all the possible corner corner cases
      // before posting data . make sure your data is secured
      const data = await connectionRequest.save();
      return res.status(200).json({
        message: "Connection Request + " + status,
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR : " + err);
    }
  }
);
module.exports = requestRouter;
