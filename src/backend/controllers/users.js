/**
 * New node file
 */
var routes = require("../../routes");
var about = require('../../routes/about');

module.exports.controller = function(app, UserModel) {

	app.set('views',  './src/front/views');
	app.set('view engine', 'ejs');
	app.get('/', routes.index);
	app.get('/about', about.about);

	UserModel(function(err,users) {
		console.log(users.createCollection("testC"));
		users.get('testC',function(err,data){
			console.log(data);
		})
	});
	
	 
/**
 * a home page route
 * 
 */
  app.get('/about', function(req, res, next) {
      // any logic goes here
	  var abstracts = {data:"dposamdpoamdpsamd"};
	  res.jsonp(abstracts);
	  res.set('Content-Type', 'application/json; charset=utf-8');
	  next();
  });

/**
 * About page route
 */
//  app.get('/about', function(req, res) {
      // any logic goes here
//      res.render('about',{'some_data':'incoming_data'})
//  });

}
