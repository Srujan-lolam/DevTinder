const mongoose = require("mongoose");
const connectionRequestSchema = mongoose.Schema(
  {
    fromUserId: {
      type: String,
      //ref is used to make a connection between this table and User table ,mongoDB does this
      //  optimially . whenever there is a need to find user infor using fromUsedId , instead of looping
      // through the ids and finding the same ids in user id , we just need to populate (refer code) by
      //making a ref like this
      ref: "User",
      required: true,
    },
    toUserId: {
      type: String,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["accepted", "rejected", "ignore", "interested"],
        message: `{VALUE} is not allowed`,
      },
    },
  },
  {
    timestamps: true,
  }
);

connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  if (connectionRequest.fromUserId === connectionRequest.toUserId) {
    throw new Error("You cannot send connection request to yourself");
  }
  next();
});

const ConnectionRequestModel = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = ConnectionRequestModel;
