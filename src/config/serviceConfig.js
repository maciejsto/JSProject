/**
 * Created by syzer on 5/15/2014.
 */
'use strict';
var ROOT_PATH = __dirname + '/../../';
var services = {
    _: require('lodash-node'),   // lodash??
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
    //articles: {},
    bodyParser: require('body-parser')(),
    //cheerio: require('cheerio'),
    //cookieParser: require('cookie-parser')(),
    connect: require('connect'),
    config: require(ROOT_PATH + 'src/config/config')(),
    
    'logfmt': function addService(sm){
    	var logfmt = require('logfmt');
    	var logger = logfmt.requestLogger();
    	
    	return logger; 
    },
    
    
    
//    'controller.rest': function addService(sm) {
//        return require(ROOT_PATH + 'controllers/rest')(
//            sm.get('config'),
//            sm.get('log'),
//            sm.get('app'),
//            sm.get('expres.restify.mongoose'),
//            sm.get('http'),
//            sm.get('model.restEndPoints')
//        );
//    },
//    'controller.referenceSearch': function addService(sm) {
//        return require(ROOT_PATH + 'controllers/referenceSearch')(
//            sm.get('log'),
//            sm.get('service.web.pubmed'),
//            sm.get('q'));
//    },
    // also called web-of-science
//    'controller.referenceSearch.isi': function addService(sm) {
//        return require(ROOT_PATH + 'controllers/referenceSearch')(
//            sm.get('log'),
//            sm.get('service.web.isi'),
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
    mongo: require('mongo'),
    mongoDb: function addService(sm) {
        var mongo = sm.get('mongo');
        var mongoDb;
        var dbUri = sm.get('config').mongoDb.uri;
        function afterDbConnect(err, db) {
            if (!err) {
                return console.log("you are connected to mongodb on heroku :D");
            }
            mongoDb = db;
            return db;
        }
        mongo.Db.connect(dbUri, afterDbConnect);
    },
    //passport: require('passport'),
    //'passport.google': require('passport-google'),
    //'passport.local': require('passport-local'),
    //q: require('q'),        //when js
    //request: require('request'),
    restify: require('express-restify-mongoose'),
    'service.web.driverjs': function addService(sm) {
        return require(ROOT_PATH + 'services/web/driverjs')(
            require('webdriverjs'),
            sm.get('config')
        );
    },
    //soap: require('soap'),
    schema: function addService(sm) {
        return sm.get('mongoose').Schema;
    },
    users:  function addService(sm) {
        var mongoDb = sm.get('mongoDb');
        var users = require(ROOT_PATH + 'src/service/users')(mongoDb);
        return users;
    },
    //soap: require('soap-q')(require('soap')),
    //validator: require('validator'),
    when: require('when'),
    //xmlParser: require('libxmljs'),
    //xml2js: require('xml2js')
};
module.exports.services = services;
