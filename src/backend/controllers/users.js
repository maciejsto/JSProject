'use strict';
var routes = require("../../routes");
var about = require('../../routes/about');
var arduino = require('../../routes/arduino');

var BaseController = require('./Base'),
    View = require('../../front/views/Base');



//ok
//using a construction function
function myNewOb(){
    this.name = "new name";
    this.run = function(req,res,next){

    };

}
//not ok
var obj = function(){
    //private
    this.name = 'User';
    this.db = db;
    this.users = {};
  return {
       name: 'ala',
      init: function(db){
          this.db = db;
      },
      run: function(req,res,next){

      }
  };
};
//ok
//using object initializer
var o = {

    name: 'User',
    users: {},
    init: function(client){
    var uri = "mongodb://127.0.0.1:27017/test";
    client.connect(uri, function(err, db){
        var col = db.collection('users');
        col.find().toArray(function(err, items){
        });
    });

    },

    run: function(req, res, next){

        var v = new View(res, 'users');
        var self = this;
        v.render({
            title: 'Users List',
            content: 'user_list'
        });
    }
};

//ok
//using anonymus object definition
//{params...}


module.exports = BaseController.extend(new myNewOb());



/*
module.exports.controller = function(app, UserModel) {

    // routes could be used here but app gets messy,
    // better to keep them in web.js file
    //app.get('/about', about.about.showUserData(UserModel));
    //app.get('/about', about.about.dummyFunction);
    //app.get('/about', about.list);
    //app.get('/', routes.index);
    //app.post('/tasks', tasks.markAllCompleted)
   // app.get('/about', about.list);
    //app.post('/tasks/:task_id', tasks.markCompleted);
    //app.del('/tasks/:task_id', tasks.del);
    //app.get('/tasks/completed', tasks.completed);

    app.get('/about', function(req, res, next){
        UserModel(function(err,users) {
            //console.log(users.createCollection("testC"))
            users.get('testC',function(err,data){
                console.log("users_data: ",data);
                //app.get('/about', function(req, res){
                    //res.send('about',{user: data});
                    res.status('about').render('about',{user: data});
                //});
            });
        });
    });

    app.get('/users/:id', function(req, res, next){
        var id = req.params.id;
        console.log(id);
        //TODO ...
    });


  app.get('/about', function(req, res, next) {
      // any logic goes here
	  var abstracts = {data:"dposamdpoamdpsamd"};
	  res.jsonp(abstracts);
	  res.set('Content-Type', 'application/json; charset=utf-8');
      //res.render('about');
	  next();
  });

}
*/