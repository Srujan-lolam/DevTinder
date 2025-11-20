// modules are individual files that protect their variables and functions from begin leaked to other
// modules .in order to use variables or functions we need to export explicitly
//there are two types of module export methods in node . common js modules and es module exports
// (cjs and mjs) . cjs is the default one .we use export and require for this . for mjs - we need
// to explicitly configure in package.json file as type : "module" and use import and export
// cjs is synchronous in nature and mjs is asynchronous in nature .cjs is run in non strict mode
// whereas mjs runs in strict mode
// module.exports is an exmpty object

// EPisode - 5 :
// whenever we write require - it wraps the entire module(which we write inside require) into an IIFE
// (Immedietely invoked function expression ) which is why we canot access variables and functions
// until exported .
// the IIFE will have many arguments given by node - module , require etch which is why we are able to use'
// those inside a module
//  5 steps when we do require("./...")
// i) resolving the module - is it a .json file , .util file , another module etc
//  ii)loading the module
//  iii) wrap the module inside an IIFE function
// iv) return sthe module exports
// v) caching the module - node does this , due to this performane  increases as it will not make
// same call multiple times
// explained more about how the code is written in node js github repository
