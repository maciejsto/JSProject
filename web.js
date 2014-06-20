'use strict';
var services = require("./src/backend/config/serviceConfig").services;
var sm = require("./src/backend/service/manager")(services);
var app = sm.get('app');
var mongo = sm.get('mongo');
var db_uri = sm.get('config').mongoDb.uri;
var mongoose = sm.get('mongoose');
var when = sm.get('when');
var astronautModel = sm.get('astronaut');
var userModel = sm.get('users');
var express = require('express');
var fs = require('fs');
var routes = sm.get('routes');
var about = sm.get('about');

var COM_PORT = "COM3";
var serialPort = sm.get('arduino')(COM_PORT);
console.log(serialPort);

/*
serialPort.on('open',function(){
    console.log('port open')
    serialPort.on('data', function(data){
        console.log("data received: " + data[0])
    }).on('error',function(err){
        console.log(err.message)
    })
})
*/


mongoose.connect(db_uri);   //ok
var db = mongoose.connection;   //ok


var astroData = {
    name: 'John Schimmel',
    skills: ['floating', 'repairing satellites'],
    walkedOnMoon: false
};

var controllers = [];
fs.readdirSync('./src/backend/controllers').forEach(function (file) {
    if (file.substr(-3) === '.js') {
        console.log("routes", file);
        controllers.push(file);
    }
});
console.log("contrssssssssssss",controllers[1]);

var userController = require('./src/backend/controllers/' + controllers[1]);
var arduinoController = require('./src/backend/controllers/' + controllers[0]);
//route.controller(app, sm.get('users'));
userController.controller(app, sm.get('users'));
arduinoController.controller(app, sm.get('arduinomodel'));

//app.get('/about', about.list);
//app.get('/about', about.about.d(userModel));
//app.post('/tasks', tasks.markAllCompleted)
//app.post('/tasks', tasks.add);
//app.post('/tasks/:task_id', tasks.markCompleted);
//app.del('/tasks/:task_id', tasks.del);
//app.get('/tasks/completed', tasks.completed);

var error = require("./src/routes/error");
app.get('*', function(req, res){
    //res.send("Fucking error ");
    //res.send(404);
    res.render('error', function(err, html){
        res.send(html);
    });
})





var port = Number(process.env.PORT || 5000);
app.listen(port, function () {
    console.log("Listening on " + port);
});



