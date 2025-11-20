//njavascript is a synchronouse single threaded language meaning , it takes code line by line into a
// single thread unlike other languages where they have multiple threads and share common memory.
//synchronouse vs asynchronous - think of restareutn serving its customers example
//explained how the javascript executes synchronous codes - global execution context , memory heap
//garbage collection - you know from namasthe js
//javascript does have the capablity of executing the asynchronous code , it does not have the
//concept os timer , connecting to db etc , all these asynchronous tasks will be taken caare by
//libUv library .
//js is a high level langauge and os cannot uderstand it , os needs level level language which is given by libUv written in c
//whenever there is an asynchrnous task like making api call , reading from a file , connecting to db
//etc , then javscript engine just takes that task and gives to libUv , and js engine continues executing
//the other parts , libUv handles all the masynchronous tasks parallely . when it finishes , it
//returns the data to js engine , and js startes executing those lines .

// whenever we run the async.js file , you will understand the flow , cjs module runs requires synchronously
// fs and https will be run synchronously , whenever js engine encounters asyn operations like,settimeout
// fileread , api call , it will handover those tasks to libUv and continuous with its execution
// as soon the libuv completes execution , it returns the data to js engine and the js engine starts implementing it
//require("fs") == require("node:fs")
//never use synchronous functions as they block the main thread and might make to wait for longer time
