let http = require('http');

let response = 'Hi to my<b>client!</b>';

let port = 8888;

let statusCode = 200;

http.createServer((req, res)=>{
    res.writeHead(statusCode, { 'Content-Type': 'text/html' });
    res.end(response);
}).listen(port);

