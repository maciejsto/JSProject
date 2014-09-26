// connect to the socket server
var services = require("../../../src/backend/config/serviceConfig").services;
var sm = require("../../../src/backend/service/manager")(services);
//var socket = require('socket.io-client')('http://jsproject.herokuapp.com');
var socket = require('socket.io-client')('http://localhost:3000');

//var socket = io.connect('http://jsproject.herokuapp.com');

//var serialPort = sm.get('serial')(sm.get('config').Serial.port);
//var arduinoModel = sm.get('arduinomodel')(serialPort);

// if we get an "info" emit from the socket server then console.log the data we recive


var ardu = function() {
    //serialPort.on('data', function (data) {

        setTimeout(function () {
            console.log('calling ardu..');

            socket.emit('arduinoData', {arduinoData: '_some dummy data from arduiuno'});
            //var data = arduinoModel.getSerialData();

            //console.log("data",data);
            //console.log(JSON.stringify(data));
            //socket.emit('arduinoData', {data: JSON.stringify(data)});

        }, 1000);
    //});
};

socket.on('connect', function () {

    console.log('client connected');    //browser console
    arduinoModel.connect();
    ardu();

    socket.on('ServerGotArduinoData', function (data) {
            ardu();
            //var data = arduinoModel.getSerialData();
            //console.log(JSON.stringify(data));
            //socket.emit('message', {data: JSON.stringify(data)});
            //socket.emit('message', {data: JSON.stringify(data[0])});
    });

});
