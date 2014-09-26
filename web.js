'use strict';
var services = require("./src/backend/config/serviceConfig").services;
var sm = require("./src/backend/service/manager")(services);
var app = sm.get('app');
var fs = sm.get('fs');
var usersModel = sm.get('users');
var serialPort = sm.get('serial')(sm.get('config').Serial.port);
//var arduinoModel = sm.get('arduinomodel')(serialPort);
var arduinoModel = sm.get('arduinomodel');

var routes = sm.get('routes');
var server = sm.get('httpServer');
var io = sm.get('io')(server);
var port = sm.get('config').port;
var controllers = [];   //global variables holding list of controllers files
var MongoClient = sm.get('mongoClient');



/*
app.use(function(req, res , next){
    req.db = mongoDB;
});
*/

/*
var mongoClient = sm.get('mongo').MongoClient;
mongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db){
    console.log('connected.. with mongoClinet to local db..');
});
*/


fs.readdirSync('./src/backend/controllers').forEach(function (file) {
    if (file.substr(-3) === '.js') {
        console.log("controller:", file);
        controllers.push(file);
    }
});
var userController = require('./src/backend/controllers/' + controllers[3]);
var arduinoController = require('./src/backend/controllers/' + controllers[1]);

//userController.controller(app, usersModel, io);
arduinoController.run(app, arduinoModel, io);


//console.log('arduinoControllr name: ',arduinoController.getName());
var AdminController = require('./src/backend/controllers/'+ controllers[0]);




io.on('connection', function (socket) {
    console.log('client connected');
    socket.on('stateChanged', function(data){
        socket.emit('getArduinoData',{data: 'server asks for data..'});
    });

    setTimeout(function(){
        socket.emit('message', {data: 'message1'});
    },1000);
    socket.on('getArduinoData',function(data){
        console.log("arduinoData", data);// server console
        socket.emit('updateData');
        //socket.emit('ServerGotArduinoData',{data: 'got it '});

    });
    /*
    socket.on('myevent', function(data){
        setTimeout(function(){
            var data = arduinoModel.getSerialData();
            socket.emit('message', {data: 'echo message'});
            //socket.emit('message', {data: JSON.stringify(data[0])});
        },1000);

    });
    */

serialPort.on('open',function() {
 console.log('serialport opened');
 serialPort.on('data', function (data) {
 console.log(data);
 });
        console.log('port opened');
        arduinoModel.getSerialData(function(data){
            console.log('inside arduino callback');
            //socket.emit('serialData', {message: data});
        });
    });


});

app.use(function(req,res,next){
    console.log('something happening here');
    next();
});

var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
    // configure stuff here

    console.log('configure stuff here..');
}

//APP SETTINGS//
app.set('views', __dirname + '/src/front/views');
app.set('view engine', 'ejs');
//var arduinoController = controllers[0];
//var userController = controllers[1];


//ROUTES//
app.route('/')
    .get(routes.index);

app.route('/about')
    .get(routes.about.dummyFunction);
//app.get('/arduino', routes.arduino);
//app.get('*', routes.error);

app.all("/admin*", function(req,res,next){
    AdminController.run(req,res,next);
});
app.all('/users*', function(req,res,next){
    userController.run(req,res,next,MongoClient);
});

console.log('name of Admin Controller: ',AdminController.name);

//START SERVER ON DEDICATED PORT//
server.listen(process.env.PORT || port, function(){
    console.log("http server listening on port: ",server.address().port, server.address().address);
});