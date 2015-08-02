// Load required packages
//var User = require('../models/user');
var User = require('mongoose').model('User');



// Create endpoint /api/users for POST
exports.postUsers = function(req, res) {

  var user = new User({
    username: req.body.username,
    password: req.body.password
  });

  user.save(function(err) {
    if (err){
        console.log('error saving user');
        res.json(err);
    }else{
      res.json({ message: 'New beer drinker added to the locker room!' });
    }
      
    });
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
  User.find(function(err, users) {
    if (err){
        console.log('error getting users');
        res.json(err);
    }else{
      res.json(users);
    }
      
    });
};