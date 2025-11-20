const fs = require("fs");
const { nextTick } = require("process");
const a = 100;
setImmediate(() => console.log("setImmediate"));
Promise.resolve("Promise").then(console.log);
fs.readFile("./file.txt", "utf8", () => {
  console.log("File reading CB");
});
setTimeout(() => console.log("Timer expired"), 0);
function printA() {
  console.log("a=", a);
}
process.nextTick(() => console.log("promise nextTick "));

printA();
console.log("Last line of the file");

//output
// a = 100
// Last line of the file
// promise nextTick
// promise resolved
// Timer expired
// setImmediate
// FIle reading Cb
