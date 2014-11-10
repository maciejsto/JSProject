'use strict';
require('newrelic');
var services     = require("./src/backend/config/serviceConfig").services;
var sm           = require("./src/backend/service/manager")(services);
var app          = sm.get('app');
var fs           = sm.get('fs');
var usersModel   = sm.get('users');
//var serialPort   = sm.get('serial')(sm.get('config').Serial.port);  //COM3
var arduinoModel = sm.get('arduinomodel');
var routes       = sm.get('routes');
var server       = sm.get('httpServer');
var io           = sm.get('io')(server);
var port         = sm.get('config').port;
var MongoClient  = sm.get('mongoClient');
var when         = sm.get('when');
var db           = sm.get('mongoose').connect(sm.get('config').mongoDb.uri, function(){
    console.log('mongoose db connection established, db: ',sm.get('config').mongoDb.uri);
});

var controllers  = [];                      //global variables holding list of controllers files
var clients      = [];

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

/*******************************loading controllers names from directory into array*/ //TODO refactor to imediatelly invoke controller 
fs.readdirSync('./src/backend/controllers').forEach(function (file) {
    if (file.substr(-3) === '.js') {
        console.log("controller:", file);
        controllers.push(file);
    }
});

/******************************calling particular controllers*******************************************/
var BaseController = require('./src/backend/controllers/' + controllers[3]);
var userController = require('./src/backend/controllers/' + controllers[4]);
var arduinoController = require('./src/backend/controllers/' + controllers[1]);
var AdminController = require('./src/backend/controllers/'+ controllers[0]);
var astronautsController = require('./src/backend/controllers/' + controllers[2]);
console.log(controllers);

/*calling methods on controllers*/
//userController.controller(app, usersModel, io);
//arduinoController.run(app, arduinoModel, io);
//arduinoController.setDebug(true);
//console.log("controller name: ",arduinoController.getName());
//astronautsController().setDebug(true);
//astronautsController().run(app);
//console.log(astronautsController.getName());
//astronautsController.setDebug(true);


/*****using socket to receive request from browser , process it , send to client(raspberry) and receive response********/
io.on('connection', function (socket) {
    socket.setMaxListeners(0);
    console.log('client connected in web.js');
    clients.push(socket);
    var i = clients.indexOf(socket);
    console.log("socketID:",clients[i].id);
    
        /*wait for button state change True/False*/
        socket.on('stateChanged', function(data){
            console.log('state changed '+ data.state);

            socket.broadcast.emit('updateState',{data: data});
            //socket.emit('updateState', {data:'new_state'});
        });

        /*do something on client event*/    
        socket.on('client', function(data){
            console.log('form client:', data);
            socket.emit('server', {data: 'data from server'});
        });
        
        /*do task on disconnect*/
        socket.on('disconnect', function(socket){
            
            while(clients.length > 0){
                clients[i] = null;
                clients.pop();
            }
            console.log('client disconnecting from server', clients);
            
        });
        
        //TODO other tasks
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

/*******************working with serialport**********************************/
/*
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
*/

/*console loggin data on every request ex. page reload*/
app.use(function(req,res,next){
    console.log('something happening here');
    next();
});

//ENVIRONMET SETTINGS
var env = process.env.NODE_ENV || 'development';
if ('development' === env) {
    // configure stuff here
    console.log('configure stuff here..');
}
//APP SETTINGS//
app.set('views', __dirname + '/src/front/views');
app.set('view engine', 'ejs');

//ROUTES//
app.route('/')
    .get(routes.index);

app.route('/index')
    .get(routes.index);

app.route('/about')
    .get(routes.about.dummyFunction);
    //app.get('/arduino', routes.arduino);
    //app.get('*', routes.error);

app.all("/admin*", function(req,res,next){
    AdminController.run(req,res,next);
});

/*
app.all('/users*', function(req,res,next){
    //userController.run(req,res,next,MongoClient);
});
*/

//console.log('name of Admin Controller: ',AdminController.name);

//START SERVER ON DEDICATED PORT//
server.listen(process.env.PORT || port, function(){
    console.log("http server listening on port: ",server.address().port, server.address().address);
});






/*********  working with Promises  ********************

var f = function(state){
        return state;
};


var promise = when.promise(function(resolve, reject, notify){

    //do something async
    var result = f('false');
    try {
        if (result === 'true') {
            resolve(result);
        }else{
            reject(result);
        }
    }catch(e){
        //catch other error
        reject(e);
    }

});
var fulfiled = function(value){
    console.log('fulfilled: ',value);
};
var rejected = function(err){
    console.log('called on rejected: ',err);
};
var followingpromise = promise
    .then(function(data){
        console.log('fulfiled: ',data);
    })
    /*
    .catch(function(err){
        console.log('rejected: ',err);
    });
    
    .catch(function(err){
        rejected(err);
    });
*/
