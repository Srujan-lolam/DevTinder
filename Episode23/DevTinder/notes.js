//Episode23
// creating all the apis in a single file is not a good practise - because when we scale our
//  application it becomes touch to maitain the code , test the code ,performance decreases etc
// better way is to created express router handlers by grouping similar apis into one route
// authRouter
//  -POST /signUp
//  -POST /login
//  -Post .logout

// profileRouter
//  -GET /profile/view
//  -PATCH /profile/edit
//  -PATCH /profile.password

// ConnectionRequestRouter
//  -POST /request/send/interested/:userId
//  -POST /request/send/ignored/:userId
//  -POST /request/review/accepted/:userId
//  -POST /request/review/rejected/:userId

// UserRouter
//  -POST /user/connections
//  -POST /user/requests
//  -POST /user/feed

//added express routes so that when we scale our appliation , code will be still maintanable,scalable etc
//created auth and profile apis -nothing much theoritically , explore the refactored code
