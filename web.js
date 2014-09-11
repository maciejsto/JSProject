'use strict';

var services = require("./src/backend/config/serviceConfig").services;
var sm = require("./src/backend/service/manager")(services);
var app = sm.get('app');
//var mongo = sm.get('mongo');
//var db_uri = sm.get('config').mongoDb.uri;
//var express = sm.get('express');
var fs = sm.get('fs');
var usersModel = sm.get('users');
//var serialPort = sm.get('serial')(sm.get('config').Serial.port);
var arduinoModel = sm.get('arduinomodel');
var routes = sm.get('routes');
var port = Number(process.env.PORT || 3000);
var server = sm.get('httpServer');
var io = sm.get('io')(server);
//var conf = require('./src/backend/config/index')();

var myrand = function(){
    return Math.floor((Math.random() * 100) + 1);
}

io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat, on connection' });
    socket.on('send', function (data) {
        console.log('data-server side ',data);
        //io.sockets.emit('message', data);
    });
    socket.on('myevent',function(data){
        console.log('data, from client',data);
        socket.emit('message', {message:myrand()});
    });
})


//var ap = require('express')();
//var server = require('http').Server(ap);
/*


var http = sm.get('http');
var conf = require('./src/backend/config/index')();
var server = http.createServer(app);
var io = sm.get('socket');
*/
/*
var socket = io.listen(server,{
    "transports": ["xhr-polling"],
    "polling duration": 10
});
*/


//SOCKET IO// TODO -> write some code for debugging sockets

//server.listen(port, function(){
//    console.log("http server Listening on " + port);
//});
//var io = io.listen(server);

// Heroku won't actually allow us to use WebSockets
// so we have to setup polling instead.
// https://devcenter.heroku.com/articles/using-socket-io-with-node-js-on-heroku



//APP SETTINGS//
app.set('views', __dirname + '/src/front/views');
app.set('view engine', 'ejs');

var controllers = [];   //global variables holding list of controllers files

fs.readdirSync('./src/backend/controllers').forEach(function (file) {
    if (file.substr(-3) === '.js') {
        console.log("controller:", file);
        controllers.push(file);
    }
});
var userController = require('./src/backend/controllers/' + controllers[3]);
var arduinoController = require('./src/backend/controllers/' + controllers[1]);

//var arduinoController = controllers[0];
//var userController = controllers[1];

//CONTROLLERS -> inject Models if applicable
userController.controller(app, usersModel,io.sockets);
arduinoController.controller(app, arduinoModel);



//ROUTES//

app.get('/', routes.index);
app.get('/about', routes.about.dummyFunction);
/*
app.get('*', function(req, res){
    res.render('error',function(err, html){
        res.send(html);
    });

})
*/
//app.get('/arduino', routes.arduino);
//app.get('*', routes.error);

app.all("/admin*",routes.admin);


//START SERVER ON DEDICATED PORT//

/*
app.listen(port, function () {
    console.log("Listening on " + port);
});
*/

server.listen(port, function(){
    console.log("http server listening on port: ",port);
});








//tests
/**************************************************

 serialPort.on('open',function(){
    console.log('port open')
    serialPort.on('data', function(data){
        console.log("data received: " + data[0])
    }).on('error',function(err){
        console.log(err.message)
    })
})

 mongoose.connect(db_uri);   //ok
 var db = mongoose.connection;   //ok

 var astroData = {
    name: 'John Schimmel',
    skills: ['floating', 'repairing satellites'],
    walkedOnMoon: false
};

 */