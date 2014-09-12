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

        return app;
    },

    serial: function addService(sm){

        return function(portName){
            var SerialPort = require("serialport").SerialPort;
            var serialPort = new SerialPort(portName,
                {
                    bauderate: 9600
                },false);   //second param is openFlag by default set to true which means open port immediatelly
            return serialPort;
        };
    },
    arduinomodel: function addService(sm){

        //var COM3 = sm.get('config').Serial.port;
        try {
            //return function(callback){
                var serialPort = sm.get('serial')(sm.get('config').Serial.port);
                //var serialportFactory = require("serialport");
                //serialPort.on('open', function(err) {
                  //  if (err) {
                  //      console.log("device not found on port: ", sm.get('config').Serial.port);
                  //  }
                    var arduinoModel = require(ROOT_PATH + "service/arduino")(serialPort);
                    return arduinoModel;
                //});
             //};


        }catch(error){
            console.log("device not found");
        }//var serialPort = sm.get('serial')("COM3");

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

    db: function addService(sm){
        return require(ROOT_PATH + "/service/db");
    },

    mongoDb: function addService(sm) {
        var mongo = sm.get('mongo');
        var mongoDb = {};	// this does not return anything ?
        var dbUri = sm.get('config').mongoDb.uri;
        var when = sm.get('when');
        
        return function dbConnect(callback){
            //mongo.Db.connect(dbUri,function(err, db){
        	mongo.Db.connect(dbUri,function(err, db){

	        		if (err){
                        console.log('error when connecting to database');
	        			//return callback(err);
	        		}else{
                        mongoDb = db;
                        db.collection('mongodb', function(err, testColl){

                            if (err){
                                //return callback(err);
                            }
                            console.log("you are connected to mongodb on heroku :)");
                            callback(null,db);
                        });
                    }


        	});
        }
    },
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

    socket: function addService(sm) {
        var socket = require('socket.io');
        return socket;
    },

    users:  function addService(sm) {
        var mongoDb = sm.get('mongoDb');

       return function getUsers(callback){
			mongoDb(function(err, db){
					var users = require(ROOT_PATH + 'service/users')(db);
					return callback(null, users); //TODO with or without return ??
				});
        }
    },
    

    when: require('when')
};
module.exports.services = services;
