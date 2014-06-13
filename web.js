var services = require("./src/backend/config/serviceConfig").services;
var sm = require("./src/backend/service/manager")(services);
var app = sm.get('app');
var mongo = require('mongodb');		//use sm.get
var db_uri = sm.get('config').mongoDb.uri;
var mongoose = sm.get('mongoose');
var when = sm.get('when');
var astronautModel = sm.get('astronaut');
var express = require('express');
var fs = require('fs');
//var routes = require('./src/routes');


var astroData = {
    name: 'John Schimmel',
    skills: ['floating', 'repairing satellites'],
    walkedOnMoon: false
};


fs.readdirSync('./src/backend/controllers').forEach(function (file) {
    if (file.substr(-3) == '.js') {
        console.log("routes", file);
        route = require('./src/backend/controllers/' + file);
        console.log(route);
        route.controller(app, sm.get('users'));
    }
});


var port = Number(process.env.PORT || 5000);
app.listen(port, function () {
    console.log("Listening on " + port);
});



