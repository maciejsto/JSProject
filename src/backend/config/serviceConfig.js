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
        app.use(sm.get('bodyParser'))
        app.use(sm.get('methodOverride'));
        var allowCrossDomain = function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');//config.allowedDomains
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            next();
        };
        app.use("/bower_components",express.static(ROOT_PATH + 'bower_components'));
        app.use(allowCrossDomain);
        app.use(express.static(ROOT_PATH + 'src/front'));
        app.locals.appname = "Express.js Arduino App";
        return app;
    },


    arduinomodel: function addService(sm){
        return function(serialPort){
            //var serialPort = sm.get('serial')(sm.get('config').Serial.port);
            var arduinoModel = require(ROOT_PATH + "service/arduino")(serialPort);
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

    bodyParser: require('body-parser')(),
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
    logger: require('morgan'),
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
    mongo: require('mongodb'),
    mongoskin: require('mongoskin'),

    db: function addService(sm){
        return require(ROOT_PATH + "/service/db");
    },

    mongoDb: function addService(sm) {

        var mongo = sm.get('mongo');
        var mongoDb = {};	// this does not return anything ?
        var dbUri = sm.get('config').mongoDb.uri;
        var when = sm.get('when');
        
        return function dbConnect(uri, callback){
            //mongo.Db.connect(dbUri,function(err, db){
        	mongo.Db.connect(dbUri, function(err, db){

	        		if (err){
                        console.log('error when connecting to database');
	        			//return callback(err);
	        		}else{
                        mongoDb = db;
                        console.log("you are connected to mongodb:",db.databaseName);
                        callback(null,db);
                        /*
                        db.collection('mongodb', function(err, testColl){

                            if (err){
                                //return callback(err);
                            }

                        });
                        */
                    }


        	});
        };
    },
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

                },true, function(err){
                    if( err){
                        console.log('error when opening serial port');
                    }else{
                        console.log('port connected');
                    }

                });   //second param is openFlag by default set to true which means open port immediatelly
            return serialPort;
        };
    },
    socket: function addService(sm) {
        var socket = require('socket.io');
        return socket;
    },

    users:  function addService(sm) {
        var mongoDb = sm.get('mongoDb');
        var dbUri = sm.get('config').mongoDb.uri;
       return function getUsers(callback){
			mongoDb(dbUri, function(err, db){

					var users = require(ROOT_PATH + 'service/users')(db);
					return callback(null, users); //TODO with or without return ??
				});
        };
    },
    

    when: require('when')
};
module.exports.services = services;
