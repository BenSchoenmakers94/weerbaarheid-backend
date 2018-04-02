var app = require('./app');
var http = require('http');
var sockets = require('./sockets');

//initialize a simple http server
const server = http.createServer(app);

sockets(server);

var port = process.env.PORT || 3000;

server.listen(port, function() {
    console.log('Express server listening on port ' + port);
});