
let http = require('http');
let url = require('url');
http.createServer(function (req, res) {
  let q = url.parse(req.url, true);
  console.log(q.query); //returns '?name=John'
  res.writeHead(200, {"Content-Type": "text/html", "Access-Control-Allow-Origin": "*"});
  res.end('Hello '+q.query["name"]);
}).listen(8888);


