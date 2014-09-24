// connect to the socket server
var services = require("../../../src/backend/config/serviceConfig").services;
var sm = require("../../../src/backend/service/manager")(services);
var socket = require('socket.io-client')('http://jsproject.herokuapp.com');
//var socket = io.connect('http://jsproject.herokuapp.com');

var serialPort = sm.get('serial')(sm.get('config').Serial.port);
var arduinoModel = sm.get('arduinomodel')(serialPort);

// if we get an "info" emit from the socket server then console.log the data we recive

socket.on('connect', function () {
    console.log('client connected');
    setTimeout(function () {

        socket.emit('message', {data: 'message1'});
    }, 1000);

    socket.on('myevent', function (data) {
        setTimeout(function () {
            var data = arduinoModel.getSerialData();
            console.log(JSON.stringify(data));
            socket.emit('message', {data: JSON.stringify(data)});
            //socket.emit('message', {data: JSON.stringify(data[0])});
        }, 1000);

    });

});
