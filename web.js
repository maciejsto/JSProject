'use strict';

var services     = require("./src/backend/config/serviceConfig").services;
var sm           = require("./src/backend/service/manager")(services);
var app          = sm.get('app');
var cluster      = sm.get('cluster');
var fs           = sm.get('fs');
//var User         = sm.get('users');
var User         =require("./src/backend/models/User");
//var serialPort = sm.get('serial')(sm.get('config').Serial.port);  //COM3
var arduinoModel = sm.get('arduinomodel');
var routes       = sm.get('routes');
var server       = sm.get('httpServer');
var io           = sm.get('io')(server);
var port         = sm.get('config').port;
var MongoClient  = sm.get('mongoClient');
var when         = sm.get('when');
var express      = sm.get('express');
//var oauth        = sm.get('oauth');
//util             = sm.get('util');
var db = sm.get('mongoose').connect(sm.get('config').mongoDb.uri);
    

//----------------------------------------------------APP SETTINGS------------------------------------------//
app.set('views', __dirname + '/src/front/views');
app.use(express.static(__dirname + '/src/front'));   
app.set('view engine', 'ejs');

/*global variable for storing controller names in array -----------------------------------------------*/
var controllers  = [], 
    clients      = [];
    
fs.readdirSync('./src/backend/controllers').forEach(function (file) {   //TODO get rid of sync
    if (file.substr(-3) === '.js') {
        console.log("controller:", file);
        var name = file.substr(0,file.length - 3);
        controllers[name] = {name: name, value: require('./src/backend/controllers/'+ file)};
        //controllers[name].run();
    }
    
});    
//console.log(controllers['mainCtrl']);

//var mainCtrl = ((controllers['mainCtrl']).value)();
//mainCtrl.run(app);
/******************************calling particular controllers*******************************************/
//var arduinoController    = (controllers['arduinoController']).value, //TODO var controler = controllerprovider.get('name')
    //astronautsController = (controllers['astronautsController']).value;
    //adminController      = (controllers['adminController']).value,
    //userController       = (controllers['userController']).value;


//userController.run(app, usersModel, io);
//arduinoController = new arduinoController();
//arduinoController.setDebug(true);
//arduinoController.run(app, arduinoModel,db, io);

/* ****using socket to receive request from browser , process it , send to client(raspberry) and receive response*******  */
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


//---------------------------------------------------ENVIRONMET SETTINGS--------------------------------------------------------//
var env = process.env.NODE_ENV || 'development';
if ('development' === env) {
    // configure stuff here
    console.log('configure stuff here..');
}


//ROUTES-------------------------------------------TODO move to controlleers-------------------------------------------------//
app.route('/')
    .get(routes.index);
    

app.route('/index')
    .get(routes.index);

app.route('/about')
    .get(routes.about.dummyFunction);
    //app.get('/arduino', routes.arduino);
    //app.get('*', routes.error);

app.route('/admin')
    .get(function(req,res){
    //adminController().run(req,res,next);
    });
    
app.route('/arduino')
    .get(function(req,res){
            
    });
    
app.route('/home')
    .get(function(req,res){
        
    });
    
app.route('/User')
    .get(function(req,res){
        
    });

app.route('/portfolio')
    .get(routes.portfolio);


    app.get('/angular',function(req,res){
        User.find(function(err, users){
           if (err)
                res.send(err);
                console.log(users);
           res.json(users);
        });
    });

/*
app.all('/users*', function(req,res,next){
    //userController.run(req,res,next,MongoClient);
});
*/

    
//--------------------------------START SERVER ON DEDICATED PORT---------------------------------------------//
server.listen(process.env.PORT, process.env.IP,function(){
    console.log("http server listening on port: ",server.address().port, server.address().address);
});









    





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
