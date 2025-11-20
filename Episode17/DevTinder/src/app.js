const express = require("express");
const app = express();
const { authAdmin, authUser } = require("./middlewares/auth");

// 1) play with the below route handlers - you can even wrap in array(it makes no diff)
// app.post(
//   "/user",
//   (req, res, next) => {
//     res.send("Data saved to dabased");
//     console.log("Response 1 ");
//     next();
//   },
//   (req, res, next) => {
//     console.log("Response 1 ");
//     next();
//     res.send("Data saved to dabased");
//   },
//   (req, res, next) => {
//     console.log("Response 1 ");
//     next();
//     res.send("Data saved to dabased");
//   },
//   (req, res, next) => {
//     console.log("Response 1 ");
//     next();
//     res.send("Data saved to dabased");
//   },
//   (req, res, next) => {
//     res.send("Data saved to dabased");
//     next();
//   }
// );

// app.get("/user", (req, res) => {
//   res.send(" second route handler");
// });

// 2) middleware for authorization - this will be executed for all the apis that start with admin
app.use("/admin", authAdmin);
app.get("/admin/getAllUser", (req, res) => {
  console.log("get All users data");
  res.send("All users data sent");
});
app.get("/admin/deleteUser/:id", (req, res) => {
  //logic to delete user with id = ID - const userId = req.params.id;
  console.log("deleted a user");
  res.send("Deleted a user");
});
app.get("/user", authUser, (req, res) => {
  console.log("user data sent");
});
//if anyof the routes throw error , this will be called automtically-order matters ,
// if written above the error containe line , it will throw error
app.use("/", (err, req, res) => {
  res.status(500).send("something went wrong");
});
app.listen(3000, () => {
  console.log("Server is successfully running");
});
