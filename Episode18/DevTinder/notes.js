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
