'use strict';
var services = require("./src/backend/config/serviceConfig").services;
var sm = require("./src/backend/service/manager")(services);
var app = sm.get('app');
var mongo = sm.get('mongo');
var db_uri = sm.get('config').mongoDb.uri;
var userModel = sm.get('users');
var express = sm.get('express');
var fs = sm.get('fs');
var routes = sm.get('routes');
var about = sm.get('about');





app.set('views',  './src/front/views');
app.set('view engine', 'ejs');
app.get('/', routes.index);

var controllers = [];   //global variables holding list of controllers files
fs.readdirSync('./src/backend/controllers').forEach(function (file) {
    if (file.substr(-3) === '.js') {
        console.log("routes", file);
        controllers.push(file);
    }
});
var userController = require('./src/backend/controllers/' + controllers[1]);
var arduinoController = require('./src/backend/controllers/' + controllers[0]);
//route.controller(app, sm.get('users'));
userController.controller(app, sm.get('users'));
arduinoController.controller(app, sm.get('arduinomodel'));


var error = require("./src/routes/error");
app.get('*', function(req, res){
    res.render('error', function(err, html){
        res.send(html);
    });
})


var port = Number(process.env.PORT || 5000);
app.listen(port, function () {
    console.log("Listening on " + port);
});

//tests
/**************************************************



 serialPort.on('open',function(){
    console.log('port open')
    serialPort.on('data', function(data){
        console.log("data received: " + data[0])
    }).on('error',function(err){
        console.log(err.message)
    })
})
 mongoose.connect(db_uri);   //ok
 var db = mongoose.connection;   //ok


var astroData = {
    name: 'John Schimmel',
    skills: ['floating', 'repairing satellites'],
    walkedOnMoon: false
};



*/
