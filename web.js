var services = require("./src/config/serviceConfig").services;
var sm = require("./src/service/manager")(services);
var app = sm.get('app');
var mongo = require('mongodb');		//use sm.get
var db_uri = sm.get('config').mongoDb.uri;
var Users = sm.get('users');
var mongoose = sm.get('mongoose');
var when = sm.get('when');
var astronautModel = sm.get('astronaut');
//var hbs = require('hbs');
var express=require('express');
var fs = require('fs');
//var routes = require('./src/routes');


var astroData = {
	    name : 'John Schimmel',
	    skills : ['floating','repairing satellites'],
	    walkedOnMoon : false
	};

Users(function(err,users){
	console.log(users.createCollection("testC"));
	users.get('testC',function(err,data){
		console.log(data);
	});
//	console.log(users.insert(10,"Maciek"));
});


fs.readdirSync('./src/controllers').forEach(function (file) {
	  if(file.substr(-3) == '.js') {
		  console.log("routes",file);
	      route = require('./src/controllers/' + file);
	      console.log(route);
	      route.controller(app);
	  }
	});


var port = Number(process.env.PORT || 5000);
app.listen(port, function () {
    console.log("Listening on " + port);
});



