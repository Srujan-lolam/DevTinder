const fs = require("fs");
const https = require("https");
console.log("Namasthe Node");
var a = 10;
var b = 20;
https.get("https://dummyjson.com/products/1", (res) => {
  console.log("Fetched data successfully");
});

setTimeout(() => {
  console.log("settimeout executed after 5 seconds");
}, 5000);

fs.readFile("./file.txt", "utf8", (req, res) => {
  console.log("File data : ", res);
});

function multiply(a, b) {
  var c = a * b;
  return c;
}
var res = multiply(a, b);
console.log("Multiplication result : ", res);
