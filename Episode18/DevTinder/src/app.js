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
    res.status(400).send("error in saving the data : " + err);
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

//delete api
app.delete("/deleteUser", async (req, res) => {
  const userId = req.body.email;
  try {
    // both are same - ((in terms of passing arguments , not the functions))
    // const user = await User.findByIdAndDelete({ _id : userId });
    //if we pass the field that is not in the schema , it won't throw error but will not work as expected
    const user = await User.findOneAndDelete({ email: userId });
    res.status(200).send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//updating the user - put updates all the filds -changes the given ones , if not given makes themnull
//patch only updates whatever you want to update
app.patch("/userUpdate/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["photourl", "gender", "age", "skills"];
    const isAllowed = Object.keys(data).every((k) => {
      ALLOWED_UPDATES.includes(k);
    });
    if (!isAllowed) {
      throw new Error("Update not allowed");
    }
    if (data.skills.length > 10) {
      throw new Error("Skills length must nt exceed 10");
    }
    await User.findByIdAndUpdate(userId, data, {
      returnDocument: true,
      runValidators: true,
    });
    res.status(200).send("User updated successfully");
  } catch (err) {
    res.status(400).send("Something went wrong:" + err);
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
