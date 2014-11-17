// connect to the socket server
//var services = require("../../../src/backend/config/serviceConfig").services;
//var sm = require("../../../src/backend/service/manager")(services);
var services     = require("./src/backend/config/serviceConfig").services;
var sm           = require("./src/backend/service/manager")(services);
var args = process.argv.slice(2);
//var serialPort = sm.get('serial')('/dev/ttyACM0');
//var arduinoModel = sm.get('arduinomodel')(serialPort);
var heroku_string = "http://jsproject.herokuapp.com/";
var local_string  = "http://localhost:8080";

var socket = {};
    //socket = require('socket.io-client')(heroku_string);
    socket = require('socket.io-client')(local_string);
var gpio = require('rpi-gpio');

/*
gpio.setup(7, gpio.DIR_OUT, write);

function write() {
    gpio.write(7, true, function(err) {
        if (err) throw err;
        console.log('Written to pin');
    });
}



process.on('SIGINT', function(){
    gpio.write(12, true, function(){
        gpio.destroy(function(){
            process.exit();
        });
    });
});

gpio.setup(12, gpio.DIR_OUT, function(){
    gpio.write(12, true);
});

*/
var ardu = function() {
    //serialPort.on('data', function (data) {

        setTimeout(function () {
            console.log('calling ardu..');

            socket.emit('arduData', {arduinoData: '_some dummy data from arduiuno'});
            //var data = arduinoModel.getSerialData();

            //console.log("data",data);
            //console.log(JSON.stringify(data));
            //socket.emit('arduinoData', {data: JSON.stringify(data)});

        }, 1000);
    //});
};

socket.on('connect', function onConnect() {
    console.log('socket connected to host: ',socket.io.opts.host);
    console.log(socket.io.engine.id);
    socket.io.engine.id = 'myraspberrypiID';
    console.log('client connected to server');
    console.log('socket id: ',JSON.stringify(socket.io.engine.id));
    //console.log('socket id: ',socket.id);
    
    /*emit data on connection to server*/
    socket.emit('client', {id: socket.id, data: 'client sais: Hello mighty server'});
    //arduinoModel.connect();
    //ardu();


    socket.on('updateState', function onUpdateState(data) {
        console.log('state updated , got it from server !!', data.data.state);
        var state = data.data.state;

        //to be uncommented
        //injecting button state into Raspberry gpio pins (12)
        /*
        gpio.write(12, state, function(err){
            if (err) throw err;
            console.log('writen to pin 12');
        });
        */
        /*
        serialPort.on('open', function(){
            console.log('serial port opened');
            serialPort.write("ls\n", function(err, result){
                console.log('err', err);
                console.log('result', result);
            });
        });
        */

        //ardu();
        //var data = arduinoModel.getSerialData();
        //console.log(JSON.stringify(data));
        //socket.emit('message', {data: JSON.stringify(data)});
        //socket.emit('message', {data: JSON.stringify(data[0])});
    });

    socket.on('stateChanged', function(data){
       console.log('client received data from index.ejs directly ');
    });

    socket.on('server',function(data){
        console.log(data);
    });

    socket.on('disconnect', function() {
        console.log('server stopped or crashed'); 
    });

});

