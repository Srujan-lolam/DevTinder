//Explained about what is a server , scaling , can we our laptop as server etc - you know this stuff
//server can be spojen in 2 ways - hardware and software , hardware server generally means EC2 instance
// software server refers to application - like your node application
// protocol - set of defined rules for communicating between servers(computers) over the internet
// client connets to server via a scoket which keeps opening and closing  via TCP/Ip
//we request via https/http which means http is a protocol that we are using to comunicatw with the
// required server - data will be returned in small chunks called packets ,not whole at once-but we dont
// observe as it happens very fast
//tcp/ip is protocol used for sending the data in packets .https for requesting (like a language)
//tcp for sending data
//explained more about client server -request response things - you know this stuff

//socket - whenever we request for any endpoint , socket will be opened and closed after returning the response
// immediately  . but web socket will not be closed immediately , it stays for longer time

// we browser(namasthedev.com)  --> DNS resolver returns Ip address --> client established socket
// connection with the server through http/https protocol --> server returned the response through Tcp/ip
// protocol via chunks(packets) .server can communiate with other servers as well like db server
