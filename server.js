var express = require('express')
    , http = require('http');

var app = express();
var server = app.listen(3001);
var io = require('socket.io').listen(server); // this tells socket.io to use our express server




io.sockets.on('connection', function (socket) {
    console.log('A new user connected!');
    socket.emit('info', { msg: 'The world is round, there is no up or down.' });
});

console.log("Express server listening on port:", server.address().port);


