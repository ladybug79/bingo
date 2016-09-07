var static = require('node-static');
var _ = require("underscore");
 
var fileServer = new static.Server('./public');
 
require('http').createServer(function (request, response) {
  console.log('Creating server');
  request.addListener('end', function () {
    console.log(request.url);
    if(request.url == '/bingo') {
      printBingo(response);
      response.end();
    }
    else {
      fileServer.serve(request, response);
    }
  }).resume();
}).listen(8080);

function printBingo(response) {
  response.writeHead(200, {"Content-Type": "text/html"});  
  response.write('<!doctype html>\n<html>');
  response.write('<h1>Star wars bingo</h1>');
  response.write('<table border="1">');
  var array = [];
  for(var i=0;i<25;i++) {
    array.push(i+1);
  }
  array = _.shuffle(array);
  for(var i=0;i<array.length;i++) {
    if(i%5 == 0) {
      response.write('<tr>');
    }
    response.write('<td><img src="sw' + array[i] + '.jpeg"/></td>');
    if(i%5 == 4) {
      response.write('</tr>');
    }
  }
  response.write('</table>');
  response.write('</html>');
}

