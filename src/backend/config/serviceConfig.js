/**
 * Created by syzer on 5/15/2014.
 */
'use strict';

var ROOT_PATH = __dirname + '/../';
console.log(ROOT_PATH);
var services = {
    _: require('lodash-node'),
    app: function addService(sm) {
        var express = sm.get('express');
        var app = express();
        //var session = sm.get('session');
        var bodyParser = sm.get('bodyParser');
        app.use(sm.get('bodyParser').urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
        app.use(bodyParser.json());                                     // parse application/json
        app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse app
        //var morgan = sm.get('morgan');
        var router = express.Router();
        //app.use(sm.get('bodyParser'));
        app.use(sm.get('methodOverride'));
        //app.use(morgan('dev'));
        //app.use(session({secret: 'keyboard cat'}))
        var allowCrossDomain = function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');//config.allowedDomains
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            next();
        };
        
        /*
        app.use(express.cookieParser('asd;lfkajs;ldfkj'));
        app.use(express.session({
            secret: '<h1>WHEEYEEE</h1>',
            key: 'sid',
            cookie: {
                secret: true,
                expires: false
            }
        }));
        
        */
        
        app.use("/bower_components",express.static(ROOT_PATH + 'bower_components'));
        app.use(allowCrossDomain);
        app.use(express.static(ROOT_PATH + 'src/front'));
        app.locals.appname = "Express.js Arduino App";
        return app;
    },


    arduinomodel: function addService(sm){
        return function(){
            //var serialPort = sm.get('serial')(sm.get('config').Serial.port);
            var arduinoModel = require(ROOT_PATH + "service/arduino");
            return arduinoModel;
        };
    },
    astronaut: function addService(sm){
    	var astronaut = require(ROOT_PATH + "service/astronauts");
    	return astronaut;
    },

    about: function addService(sm){
        return require(ROOT_PATH + "../routes/about");
    },

    bodyParser: require('body-parser'),
    
    cluster: require('cluster'),
    
    //cheerio: require('cheerio'),
    //cookieParser: require('cookie-parser')(),
    connect: require('connect'),
//    config: require(ROOT_PATH + 'src/backend/config/config')(),
    config: require(ROOT_PATH + 'config/config')(),
    
    
    'logfmt': function addService(sm){
    	var logfmt = require('logfmt');
    	var logger = logfmt.requestLogger();
    	
    	return logger; 
    },
//    'controller.referenceSearch': function addService(sm) {
//        return require(ROOT_PATH + 'controllers/referenceSearch')(
//            sm.get('log'),
//            sm.get('service.web.pubmed'),
//            sm.get('q'));
//    },
    port: (process.env.PORT || 8081),
    express: require('express'),
    'expres.restify.mongoose': require('express-restify-mongoose'),
    http: require('http'),
    file: function addService(sm) {
        return require(ROOT_PATH + 'services/file')(sm.get('fs'));
    },
    fs: require('fs'),
    io: function addService(sm){
        var app = sm.get('app');
        var io = sm.get('socket');
        return function(server){
          var sio = io.listen(server,{
              "transports": ["polling"],
              "polling duration": 10
          });
            return sio;
        };
    },
    httpServer: function addService(sm){
        var http = sm.get('http');
        var app = sm.get('app');
        var httpServer = http.createServer(app);
        return httpServer;
    },
    methodOverride: require('method-override')(),
    'model.restEndPoints': function addService(sm) {
        return require(ROOT_PATH + 'models/restEndpoints') (
            sm.get('config'),
            sm.get('schema'),
            sm.get('mongoose')
        );
    },
    //'model.userRoles': require(ROOT_PATH + 'models/auth/userRoles'),

    mongoose: require('mongoose'),
    mongooseapi: function addService(sm){
      var uri = sm.get('config').mongoDb.uri;
      var mongoose = sm.get('mongoose');
        var options = {
            db: { native_parser: true },
            server: { poolSize: 5 },
            replset: { rs_name: 'myReplicaSetName' },
            user: '',
            pass: ''
        }
        return mongoose.connect(uri, options);
    },
    mongo: require('mongodb').Db,
    mongoClient: require('mongodb').MongoClient,
    //mongoskin: require('mongoskin'),
    //morgan: require('morgan'),

    db: function addService(sm){
        return require(ROOT_PATH + "/service/db");
    },

    mongoDb: function addService(sm) {

        var mongo = sm.get('mongo');
        var mongoDb = {};	// this does not return anything ?

        var when = sm.get('when');
        
        return function dbConnect(callback){


            var dbUri = sm.get('config').mongoDb.uri;
            //mongo.Db.connect(dbUri,function(err, db){
        	mongo.Db.connect(dbUri, function(err, db){

	        		if (err){
                        console.log('error when connecting to database');
	        			//return callback(err);
	        		}else{
                        mongoDb = db;
                        console.log("you are connected to mongodb:",db.databaseName);
                        callback(null, mongoDb);
                    };
        	});
        };
    },
    os: require('os'),
    
    path: require('path'),
    //passport: require('passport'),
    //'passport.google': require('passport-google'),
    //'passport.local': require('passport-local'),
    //q: require('q'),        //when js
    //request: require('request'),
    restify: require('express-restify-mongoose'),
    'service.web.driverjs': function addService(sm) {
        return require(ROOT_PATH + 'service/web/driverjs')(
            require('webdriverjs'),
            sm.get('config')
        );
    },
    routes: function addService(sm){
        var routes = []
        var fs = this.fs;
        fs.readdirSync(ROOT_PATH + "../routes").forEach(function(file){
            if (file.substr(-3) === '.js') {
                routes.push(file);
            }
        })
        var obj = [];
        var temp = [];
        routes.forEach(function(route){
            var r = route.substr(-3);
            var string = '';
            var i = 0;
            while(route[i] !== '.'){
                string += route[i];
                i++;
            }
            obj[string] = (require(ROOT_PATH + '../routes/' + route))[string];
        })
        return obj;
    },
    schema: function addService(sm) {
        return sm.get('mongoose').Schema;
    },

    serial: function addService(sm){    //this returns a function , good for callback

        return function(portName){
            var SerialPort = require("serialport").SerialPort;
            var serialPort = new SerialPort(portName,
                {
                    bauderate: sm.get('config').Serial.bauderate

                }
                ,sm.get('config').Serial.flag
                , function(err,state){  // flag determines if port is automatically opened , true -> open, false -> not open
                    if( err){
                        console.log('error when opening serial port');
                    }else{
                        console.log('port connected');
                    }

                });   //second param is openFlag by default set to true which means open port immediatelly
            return serialPort;
        };
    },
    //session: require('express-session'),
    socket: function addService(sm) {
        var socket = require('socket.io');
        return socket;
    },

    users:  function addService(sm) {
        var mongoDb = sm.get('mongoDb');
        //var dbUri = sm.get('config').mongoDb.uri;
       return function getUsers(callback){
			mongoDb(function(err, db){

					var users = require(ROOT_PATH + 'service/users')(db);
					return callback(null, users); //TODO with or without return ??
				});
        };
    },
    

    when: require('when')
};

function logErrors(err, req, res, next) {
  console.error('logErrors', err.toString());
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  console.error('clientErrors ', err.toString());
  res.send(500, { error: err.toString()});
  if (req.xhr) {
    console.error(err);
    res.send(500, { error: err.toString()});
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  console.error('lastErrors ', err.toString());
  res.send(500, {error: err.toString()});
}
module.exports.services = services;
