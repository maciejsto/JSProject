// connect to the socket server
var services = require("../../../src/backend/config/serviceConfig").services;
var sm = require("../../../src/backend/service/manager")(services);
//var socket = io.connect('http://jsproject.herokuapp.com');
var serialPort = sm.get('serial')('/dev/ttyACM0');
//var arduinoModel = sm.get('arduinomodel')(serialPort);
// if we get an "info" emit from the socket server then console.log the data we recive

var heroku_string = "http://jsproject.herokuapp.com/";
var local_string  = "http://localhost:3000";
var socket = require('socket.io-client')(heroku_string);
//var socket = require('socket.io-client')(local_string);
var gpio = require('rpi-gpio');


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

socket.on('connect', function () {
    console.log('socket connected to host: ',socket.io.opts.host);
    socket.io.engine.id = 'client_id';
    console.log('client connected to server');
    console.log('socket id: ',socket.io.engine.id);
    socket.emit('client', {data: 'sadsadsadsdsdsadsadsadsads'});
    //arduinoModel.connect();
    //ardu();



    socket.on('updateState', function (data) {
        console.log('state updated , got it from s !!', data.data.state);

        //console.log(gpio.write(12, false));

        var state = data.data.state;



        gpio.write(12, state, function(err){
            if (err) throw err;
            console.log('writen to pin 12');
        });

        serialPort.on('open', function(){
            console.log('serial port opened');
            serialPort.write("ls\n", function(err, result){
                console.log('err', err);
                console.log('result', result);
            });
        });

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






});

