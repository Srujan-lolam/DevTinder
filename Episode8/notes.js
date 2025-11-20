//whenever we write the js code and execute it , the code will be passed to google v8 engine , the v8
//engine goes through several steps . 1) parsing --> 1.1) tokenization(lexixal analysis) , the code will be splitted
//into multiple tokens . 1.2)syntax analysis : tokens will be converted to abstract syntax tree
//when we write something unsual(like var x = ; no value assigned) , the v8 engine could not
// generate AST which is why we get syntax error
// step2 : code will be passed to inteprettor . for intepretted language - code will be executed line by
// line .a compiler language - whole code will be converted to machine code and executed whole at once
//intepreted langauge will be initially fast but execution will be slow , compiler is opposite of it
//js is neither intepretted not compiled language . v8 engine is JIT(just in time) compiler language
//v8 has both compiler and intepretter
//AST will pass the code to ignition intepretter(present in v8 engine) and ignition interpretter converts
// the code to bytecode . bytecode will be executed .but there will be some part of a code that is repeated .
//that code will be passed to  compiler(turbofan compiler ) and then execution. js makes use of
// both fast features of compiler and interpretter -
//lets say , we have sum function - whenever it is called for the first time , js will pass it to
//turbofan compiler and optimize it . whene the same function call happens for many times
// js will jst rteurn the output from the optimized version . but when it receives numbers as strings
//instead of integers , it passes back to the bytecode by de optimizing .-refer namasthe node pic for the above explanations
