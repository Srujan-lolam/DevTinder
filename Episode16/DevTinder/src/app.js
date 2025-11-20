const express = require("express");
const app = express();
//this is known as request handler
app.get("/", (req, res) => {
  res.send("Hello from the server");
});
app.get("/hello", (req, res) => {
  res.send("Hello Hello Hello");
});
app.get("/test", (req, res) => {
  res.send("Hello from testing ");
});
app.listen(3000, () => {
  console.log("Server is successfully running");
});
