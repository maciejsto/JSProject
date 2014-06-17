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
        app.use(sm.get('bodyParser'));
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
    astronaut: function addService(sm){
    	var astronaut = require(ROOT_PATH + "service/astronauts");
    	return astronaut;
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
    mongoDb: function addService(sm) {
        var mongo = sm.get('mongo');
        var mongoDb = {};	// this does not return anything ?
        var dbUri = sm.get('config').mongoDb.uri;
        var when = sm.get('when');
        
        return function dbConnect(callback){
        	mongo.Db.connect(dbUri,function(err, db){
        		
	        		if (err){
	        			return callback(err);
	        		}
	        	mongoDb = db;
	        	db.collection('mongodb', function(err, testColl){
	        		
	        		if (err){
	        			return callback(err);
	        		}
	        		console.log("you are connected to mongodb on heroku :)");
	        		callback(null,db);
	        	});
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
    schema: function addService(sm) {
        return sm.get('mongoose').Schema;
    },
    users:  function addService(sm) {
		var mongoDb = sm.get('mongoDb');
        var when = sm.get('when');
        
       return function getUsers(callback){
			mongoDb(function(err, db){
					var users = require(ROOT_PATH + 'service/users')(db);
					callback(null, users);
				});
        }
    },
    

    when: require('when')
};
module.exports.services = services;
