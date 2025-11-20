//routing handlers - playing with multiple route hanlders
//if any of the handlers matches and res is sent back to the b=client - the next route handlers
//will be executed only if next() is present . if you try to send res again , it will throw an error
//  this intermediate route handlers are known as middlewares
// whenever the req comes -/users - the express will search for the matching one - it will execute
// all the functions till the actual res is sent to the client . apart from the function seting actual
// res , the rest functions are known as middlewares
// app.use() - any http method, the route handler function -we can pass 4 arguments , if we give 2 ,
// it will consider req , res , if we give 3 arguments -it will consider req,res,next if we give 4
// it will consider as err ,req,res,next(order matters) - express handles this internally
