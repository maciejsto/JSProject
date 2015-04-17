var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = require('../../src/backend/models/User.js');


/* GET /users listing. */

//module.exports = router;

/*
exports.router = function(req, res,next){
    
  router.get('/', function(req, res, next) {
      User.find(function (err, users) {
        if (err) return next(err);
        res.json(users);
    });
  });

    //res.render('arduino', { title: 'Arduino Route'});
};

*/

//index route
exports.angular = function(req, res, next){
    User.find(function(err, users){
      if(err) return next(err);
      //res.json(users);
     
      
    })
    //var message = JSON.stringify("this is message from server")
    //res.write(message);
    //res.end();
    res.render('angular', {
      title: 'Express and Angular marriage'
    })  
     //res.render('angular', {
    //    'message' : 'angular route from server'
     //});
    // var data = {'message':'data'}
     //res.json({'message': 'angular routes'});
    //res.render('admin', { title: 'Admin panel' });
};
/*
router.post('/', function(req, res, next) {
  Todo.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.get('/:id', function(req, res, next) {
  Todo.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/*
router.put('/:id', function(req, res, next) {
  Todo.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/:id', function(req, res, next) {
  Todo.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
*/

