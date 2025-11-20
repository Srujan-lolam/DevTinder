const express = require("express");
const app = express();

app.post("/user", (req, res) => {
  //posting data to DB
  res.send("Data saved to dabased");
});
app.get("/user/test", (req, res) => {
  res.send("Data sent successfully");
});
//this is known as request handler - this use will handle all the http methods
// app.use("/", (req, res) => {
//   res.send("Hello from the server");
// });
// app.use("/hello", (req, res) => {
//   res.send("Hello Hello Hello");
// });
// app.use("/test", (req, res) => {
//   res.send("Hello from testing ");
// });
app.listen(3000, () => {
  console.log("Server is successfully running");
});
