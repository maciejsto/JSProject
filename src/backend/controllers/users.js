'use strict';
var routes = require("../../routes");
var about = require('../../routes/about');
var arduino = require('../../routes/arduino');

module.exports.controller = function(app, UserModel) {

	app.set('views',  './src/front/views');
	app.set('view engine', 'ejs');
	app.get('/', routes.index);
//	app.get('/about', about.about.d(UserModel))
    app.get('/about', about.list);
    //app.get('/', routes.index);
    //app.post('/tasks', tasks.markAllCompleted)
    //app.post('/about', about.add);
   // app.get('/about', about.list);
    //app.post('/tasks/:task_id', tasks.markCompleted);
    //app.del('/tasks/:task_id', tasks.del);
    //app.get('/tasks/completed', tasks.completed);

	UserModel(function(err,users) {
		console.log(users.createCollection("testC"))
		users.get('testC',function(err,data){
			console.log("users_data: ",data)
            app.get('/about', function(req, res){
                res.send('about',{user:data})
            })
        })
	})



/**
 ************************** JUST FOR TEST PURPOSE *************************************************
 * a home page route
 *
 * 
 */
  app.get('/about', function(req, res, next) {
      // any logic goes here
	  var abstracts = {data:"dposamdpoamdpsamd"};
	  res.jsonp(abstracts);
	  res.set('Content-Type', 'application/json; charset=utf-8');
      //res.render('about');
	  next();
  });
}
