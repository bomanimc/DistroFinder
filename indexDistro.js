/*
//1
var http = require('http');
 
//2 
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(index.html);
}).listen(3000);
 
console.log('Server running on port 3000.');
*/
var path = require('path');
var express = require('express');

var app = express();

var staticPath = path.resolve(__dirname, '/public');
app.use(express.static(staticPath));

app.listen(3000, function() {
  console.log('listening');
});