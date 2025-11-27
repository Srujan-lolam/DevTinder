const express = require("express");
const app = express();
const { connectDb } = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use(cookieParser());
app.use(express.json());
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

connectDb()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is successfully running");
    });
    console.log("connnected tp DB successfully");
  })
  .catch((err) => {
    console.log("DB connection failed ", err);
  });
