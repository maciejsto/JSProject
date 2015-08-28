// Load required packages
//var User = require('../models/user');
var User = require('mongoose').model('User');
// todo add model to store db logs for errors 



// Create endpoint /api/users for POST
exports.postUsers = function(req, res) {
  // console.log(req.body.username)  //ok
  var user = new User({
    username: req.body.username,
    password: req.body.password
  });

  user.save(function(err, user) {
    if (err){
        console.log('error saveing user', err)
        res.send(err);
  }else{
      res.json({ message: 'New beer drinker added to the locker room!' });
  }
  });
    
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
  console.log(req.params);
  User.find(function(err, users) {
    if (err){
        res.send(err);
    }else{
      res.json(users);
    }
    });
};

exports.getUser = function(req, res) {
  User.findById(req.params.user_id, function(err, user){
    if(err)
      res.send(err);
    res.json(user);
  });
};

exports.putUser = function(req, res) {
  User.findById(req.params.user_id, function(err,user){
    if (err)
      res.send(err);
      
    user.password = req.params.password;
    
    user.save(function(err){
      if (err)
        res.send(err);
        
      res.json(user);
    });
  })
} 

// Create endpoint /api/beers/:beer_id for DELETE
exports.deleteUser = function(req, res) {
  // Use the Beer model to find a specific beer and remove it
  User.findByIdAndRemove(req.params.user_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'User removed from the locker!' });
  });
}