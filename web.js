'use strict';
var services = require("./src/backend/config/serviceConfig").services;
var sm = require("./src/backend/service/manager")(services);
var app = sm.get('app');
var fs = sm.get('fs');
var usersModel = sm.get('users');
//var serialPort = sm.get('serial')(sm.get('config').Serial.port);
var arduinoModel = sm.get('arduinomodel');
var routes = sm.get('routes');
var server = sm.get('httpServer');
var io = sm.get('io')(server);
var port = sm.get('config').rest.port;
var controllers = [];   //global variables holding list of controllers files


fs.readdirSync('./src/backend/controllers').forEach(function (file) {
    if (file.substr(-3) === '.js') {
        console.log("controller:", file);
        controllers.push(file);
    }
});
var userController = require('./src/backend/controllers/' + controllers[3]);
var arduinoController = require('./src/backend/controllers/' + controllers[1]);

userController.controller(app, usersModel, io);
arduinoController.controller(app, arduinoModel, io);
var Admin = require('./src/backend/controllers/'+ controllers[0]);

console.log(controllers);


io.on('connection', function (socket) {


    /*
serialPort.on('open',function() {
 console.log('serialport opened');
 serialPort.on('data', function (data) {
 console.log(data);
 });
        console.log('port opened');
        arduinoModel.getSerialData(function(data){
            console.log('inside arduino callback');
            socket.emit('serialData', {message: data});
        });
    });

*/

});




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
//var io = io.listen(server);
// Heroku won't actually allow us to use WebSockets
// so we have to setup polling instead.
// https://devcenter.heroku.com/articles/using-socket-io-with-node-js-on-heroku

//APP SETTINGS//
app.set('views', __dirname + '/src/front/views');
app.set('view engine', 'ejs');
//var arduinoController = controllers[0];
//var userController = controllers[1];


//ROUTES//
app.get('/', routes.index);
app.get('/about', routes.about.dummyFunction);
//app.get('/arduino', routes.arduino);
//app.get('*', routes.error);
app.all("/admin*", Admin.run);
console.log('name of Admin Controller: ',Admin.name);

//START SERVER ON DEDICATED PORT//
server.listen(port, function(){
    console.log("http server listening on port: ",port);
});