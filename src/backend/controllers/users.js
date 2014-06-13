/**
 * New node file
 */

var mongoose = require('mongoose')
var Users = require("../service/users");
var hbs = require('hbs');
var routes = require("../routes");
var about = require('../routes/about');

module.exports.controller = function(app) {

//	console.log("userss: ",Users);
	app.set('views',  './src/views');
	app.set('view engine', 'ejs');
//	app.engine('html', hbs.__express);

	app.get('/', routes.index);
	app.get('/about', about.about);
	
	 
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
