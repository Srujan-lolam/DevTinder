const express = require("express");
const app = express();
const { connectDb } = require("./config/database");
const User = require("./model/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middlewares/auth");
app.use(cookieParser());
//this is a middleware given by express that takes req from all the routes in app and converts to js object
app.use(express.json());
app.post("/signUp", async (req, res) => {
  // const user1 = {
  //   firstName: "srujan",
  //   lastName: "Lolam",
  //   email: "srujan@gmai.com",
  // };
  //creating a new instance of the model - never pass entire data like below
  // const user = new User(user1);
  try {
    validateSignUpData(req);
    // always destrutret the fields and send to the db instead of passng entire req body from user
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.send("User added successfully ");
  } catch (err) {
    res.status(400).send("error in saving the data : " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!validator.isEmail(email)) {
      throw new Error("Invalid credentials");
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      //this is completely fyn , but not best practise , instead , write a function at the schema level
      //as this is applicable to all the users and jwt is unique to every user-commenting
      // const token = await jwt.sign({ _id: user._id }, "devTinder@123", {
      //   expiresIn: "1d",
      // });
      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });
      res.status(200).send("User Logged in Successfully");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("Invalid credentials:" + err.message);
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

app.get("/profile", userAuth, async (req, res) => {
  try {
    //as we are adding the middleware ,we need not check for the token here-commenting
    // const cookies = req.cookies;
    // const { token } = cookies;
    // if (!token) {
    //   throw new Error("Invalid token");
    // }
    // const decodeMessage = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log(decodeMessage);
    // const { _id } = decodeMessage;
    // const user = await User.findById(_id);
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth, (req, res) => {
  const user = req.user;
  res.send(user.firstName + "  is " + "sending the request");
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
