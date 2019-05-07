
let http = require('http');

let port = 8888;

let statusCode = 200;

http.createServer(function (req, res) {
  res.writeHead(statusCode, {"Content-Type": "text/html", "Access-Control-Allow-Origin": "*"});
  // Note: replace line above with res.writeHead(200, {'Content-Type': 'text/html'}); to see
  // what happens 
  res.end('Hello World!');
}).listen(port);