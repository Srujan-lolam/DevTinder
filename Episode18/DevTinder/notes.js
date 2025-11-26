//install mongoose , its a library used for creating models , interactingwith db etc
//refer code for creating userSchema and model using mongoose .
// _id and __v is automatically given by mongodb , id is used for uniquely identifying the document
// you can even add id as well - prefer not to pass , mongodb generates better ids
//__v is version
//always try to write the code using error handlers(try catch)
//if we try to pass JSON object in the req body , the js will not be able to understand it , so
//we use express.json() midleware or sent the data in jb object only
//explained schema validations and api level level validations - refer code . nothing to remeber much
// schema validation applies at the db level (user.js file) , api level validations apply before calling
// the actual  api

//Episode22 - Encrypting passwords
// explained about bcrypt- nothing much -refer code

//EPisode 23
// whenever user makes a request(login) , it will go to server via tcp/ip and the response will be sent and connection
// will be closed -remeber in the first season we talked about it.
// whenever the user logins for the first time , the server will send a JWT token(attached in the cookie) along with the respnose
// for a valid authentication . when the user tries to naviagte to other pages , then the server uses
// this jwt token(received from the request ) to authorize instead of making call again-jwt will be stored in cookies in browser
//refer to the diagram from doc- jwt token will be different to each user , when we try to access
// profile , the server validated the token first(if exists) and returns the profile of logged in user
