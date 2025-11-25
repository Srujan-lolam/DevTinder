const express = require("express");
const app = express();
const { connectDb } = require("./config/database");
const User = require("./model/user");
//this is a middleware given by express that takes req from all the routes in app and converts to js object
app.use(express.json());
app.post("/signUp", async (req, res) => {
  const user1 = req.body;
  // const user1 = {
  //   firstName: "srujan",
  //   lastName: "Lolam",
  //   email: "srujan@gmai.com",
  // };
  //creating a new instance of the model
  const user = new User(user1);
  try {
    await user.save();
    res.send("User added successfully ");
  } catch (err) {
    res.status(400).send("error in saving the data");
  }
});

//api to find the users with specific email Id -
//findOne returns a single user that matches for the first time
app.get("/user", async (req, res) => {
  const emailId = req.body.email;
  try {
    const user = await User.findOne({ email: emailId });
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//feed api
app.get("/feed", async (req, res) => {
  //find api returns all the objects from the collections - we should pass empty object
  //if we pass any identity like emailId , it returns all objects that matches the email/refer docu
  try {
    const user = await User.find({});
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

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
