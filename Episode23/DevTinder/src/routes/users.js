const express = require("express");
const userRouter = express.Router();
const userAuth = require("../middlewares/auth");
const ConnectionRequest = require("../model/connectionRequest");
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
      //both are valid and same ,( array or strings).
    }).populate("fromUserId", "firstName lastName");

    // }).populate("fromUserId", [firstName, lastName]);
    //mention whatever fields you need like fistName ,else entire user data will be shown
    //while working on get apis , we should ensure that only requried data is passed tot he user
    res.status(200).json({
      message: "connection requests retrived successfully",
      data: connectionRequests,
    });
  } catch (err) {
    return res.status(400).json({ message: "ERROR" + err });
  }
});

const USER_SAFE_DATA = "firstName lastName about photoUrl skills age gender";
userRouter.get("user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);
    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.fromUserId;
      }
      return row.fromUserId._id;
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = userRouter;
