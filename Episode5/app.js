// const { x, calculateSum } = require("./calculate/sum.js");

const { multiply, calculateSum } = require("../Episode4/calculate"); // here app js does not know from where the multiple and calculateSuma re coming - are they individual or single ensuring abstraction
require("./xyz.js");
var name = "Namsthe node";
var a = 10;
var b = 30;
// const x = 200;
// console.log(x); // conflict , already declared
calculateSum(a, b);
multiply(a, b);
// console.log(name);
// console.log(a + b);
