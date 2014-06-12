var services = require("./src/config/serviceConfig").services;
var sm = require("./src/service/manager")(services);
var app = sm.get('app');
var mongo = require('mongodb');		//use sm.get
var db_uri = sm.get('config').mongoDb.uri;
var usersF = sm.get('users');
var mongoose = sm.get('mongoose');
var when = sm.get('when');
var astronautModel = sm.get('astronaut');
var hbs = require('hbs');
var express=require('express');


var astroData = {
	    name : 'John Schimmel',
	    skills : ['floating','repairing satellites'],
	    walkedOnMoon : false
	};


app.set('view engine', 'html');
app.engine('html', hbs.__express);
//configuration

app.get('/index.html', function(req, res) {
	console.log('rendering');
	
    //res.render('./src/front/index.html',{a:"some data"});
});

//mongoose.connect(db_uri);
//var newAstro = new astronautModel(astroData); // new astronaut document
//newAstro.save(); //save to database
//app.get('/', function(req, res){
//		res.render('index.html', {a: "astro: "+newAstro['name']});
//	  res.render('./src/front/index',{'a': newAstro['name']});
//	  res.send('hello world'); //replace with your data here
//	});


usersF(function(err,users){
	console.log(users.createC("testC"));
	users.get('testC',function(err,data){
		console.log(data);
	});
//	console.log(users.insert(10,"Maciek"));
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function () {
    console.log("Listening on " + port);
});



