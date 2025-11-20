const http = require("http");
const server = http.createServer((req, res) => {
  if (req.url === "/getSecretData") {
    return res.end("there is no secret data");
  }
  res.end("hellow world");
});
server.listen(7777);
