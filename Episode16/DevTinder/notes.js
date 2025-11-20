// npm init - contains the meta data about the project , setting configuration for our project
//we need to create a server that listens to the outside world
// express.js - framework creating server for node js
//  when we npm i express - node modules will be created that means all the code of express .js is
// in node modules -it downloaded and put in our folder
// also , it adds that particualr dependency (here express) will be automatically added in package.json file
// any version will be of [x.y.z]  = represents [major minor patch] patch - small bug
//minor - a small change (a small feature like ) both patch and mninor are backward compatible
// but for major change , our prject was on express version x.y.z .if the express changes to x+1.y.z
// then the project is not backward compatible , might break the application if we update to newer version
//if we put carot it will automatically update patch version whenever we do npm install but in packgae-lock json will conatina 14.92.2 only
//order of the routes matter alot
// explianed about postman - you already know this stuff

//routing handlers : a+ --> a/aa/aaa/etc , a? --> a is optinal , a*--> anything after a
//req.params --> fetches all the params from the url
//req.query() --> gives all the info from req body
