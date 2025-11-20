// design
// features  of dev tinder - its a platform where engineer connect with others to build new apps, trends etc
// 1) user registration
// 2) login
// 3) user update
// 4) connection requests
// 5) explore other users
// 6) see our matches
// 7) chat

// LLD of DevTinder
// 1)
// first we need to decide the features we are going to build . then design the schema of your DB
// we need user infor for registration and login s0 we neeed our schema that stores user info

// user --> firstName , lastName ,email , password , status , interests etc

// we are making connection requests to others one to many , we cant store tha info in user schema

//connectionRequest --> from userId , to userId , status(pending , rejected , approved ,ignore(not rejecting , not approving))
// 2)
// Rest APis : REST suggests to create an object of the data requested by the client and send
//  the values of the object in response to the user. different types include Get apis , put apis
// post apis, patch apis
// i) /signUp - Post
// ii) /login - Post
// iii) /profile - Get
// iv) /profile - Post
// v) /delete -
// vi) sendRequest-Post -- ignore , inetrested
// vii) reviewRequest -Post
// viii)  /requests GET
// ix) /connections -GET
//you should even design each data types , length etc everything in design only
