//Mongo Db is a NoSQL database . it has 2 version - community and enterprise .comminuty is for free
//with limited resources ,enterpricess is for companies . you can download and install and use it local
// like any other applciation .or use directly from monogodb-it takes its own server .
//mongoDB is of two types - self hosted - you have take care of everything like scaling , backup etc
//try free atlas - free version which they hosted their DB in some cloud and giving to us .
// it will take care of evrything itself like back up , scaling etc

// cluster - assume it is your database , we have to deploy it in any cloud but mongoDB takes care of it
//we just need to select preferred cloud platform
// create account in mongoDb(just browse and follow like any other sign up ) --> create cluster button
// --> give any name --> choose cloud platform --> click done.copy your username and password somewhere
//install  mongodb as it is not present in node by defualt - npm i mongodb

//EPisode 14
//WaterFall model
// 1) requirements gathering : product managers /project managers along with the deisgn team gather
// all the requriments (features) .
// 2) design : Senior developers/tech leads/engineering managers start design the architrectures of
//varioud features , decide which tech stack , ETA etc
// 3) developement : developers(SDE1/interns/SDE2) start developing the applications + write unit test cases
// 4) testing : the features developed by the developers above will be tested by the testing team (SDET)
// 5 ) deployments : devops engineers or developers start deploying the code to the git platforms
// 6 ) maintance : the above steps will be repeated

//monolothic vs microservices

// monolothic : one big project(single repo) containing all the services (FE,BE , Devops , etc)
//service : in simple words it a small project(small repo having one significance/task)
//microservices : multiple repos(projects) each handling one task and communicating together
//one repo for FE , one repo for BE , one repo CMS , one repo for payment service etc
//earlier monolithic used to dominate but now microservices is mostly preferred

// 1) dev speed
// monolithic is slow as the entire code is in single repo -increased size
//   2) scalability
// microservices is good in microservices(if FE requries to scale only FE can be scaled so billing is low
// ) and poor in monolithic .
// 3 ) deployment :
//  one line change needs entire code to be deployed , so poor in monolithic . microservices
// is good as each repo in independent .

// 4) techstack :
// monolithic is restricted to a single restricted - if we want to use react for FE , we have to
// stick to node(js based) . micrservices is not restricted , FE can react , BE can be java

//5 ) infra cost - microservices has more infra cost due to multiple services

//6) fault toleration : monolithic , if a single line is causing entire project will be down
// in microservice if BE has any issue only BE services will be down

// 7) testing monlithic is easy

// 8) maintanance : easier to maintain microservice and touch in monolithic
