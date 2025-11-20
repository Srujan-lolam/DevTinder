// Refer to the picture in namasthe node . the v8 engine has callstack where all the synchronous tasks
// will be executed . when it encounters an asynchrnous task ,it sends it to libUv , libUv has callback
// queue and thread pool , it takes all the asynchrnous tasks and put them in callback queue and starts
// executing them . the event loop in libUv continuously checks if the callstack in v8 engine is
// empty , as soon it is empty , it takes the tasks from callback queue and put it in callstack for
// v8 engine to execute

//event loop has four phases(refer diagram ) - timer , poll, check, close , even before running
// each phase , event loop checks if promise.nextTicket and promise callbacks (if any) are present , if present
// it pushes them to their own queues .this happens before each phases
// 1 - priority queues
// 2 - setTimeout , setImmediate
// 3 - poll operations(I/O , https , fs etc)
// 4 - check
// Promise.nextTick(cb); 1
// Promise.resolve(cb) 2
// setTimeout(cb,0) 2
// setImmediate(cb) 3
// fs.readFile("./a.txt",cb) 4
// https.get("URL",cb) 4
//when event loop has nothing to execute , then it waits at poll phase - if any fs ,I/O operations comes
//it quickly starts executing it and runs the loop
