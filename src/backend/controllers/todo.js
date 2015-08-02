// Load required packages
var Todo = require('../models/todo');
    
exports.postTodo = function(req, res){
    
  var Todo = new Todo();
  
  console.log(Todo);
  
  Todo.name = req.body.name;
  Todo.completed = req.body.completed;
  Todo.note = req.body.note;
  
  Todo.save(function(err){
    if (err)
      console.log('error saving todo');
      
    res.json({message: 'Todo item added to the database', data: Todo});
  });
}




// Create endpoint /api/beers for GET
exports.getTodos = function(req, res) {
  // Use the Beer model to find all beer
  Todo.find({ todoId: req.user._id }, function(err, todos) {
    if (err)
      return res.send(err);

    res.json(todos);
  });
};

// Create endpoint /api/beers/:beer_id for GET
exports.getBeer = function(req, res) {
  // Use the Beer model to find a specific beer
  Beer.find({ userId: req.user._id, _id: req.params.beer_id }, function(err, beer) {
    if (err)
      return res.send(err);

    res.json(beer);
  });
};

// Create endpoint /api/beers/:beer_id for PUT
exports.putBeer = function(req, res) {
  // Use the Beer model to find a specific beer
  Beer.update({ userId: req.user._id, _id: req.params.beer_id }, { quantity: req.body.quantity }, function(err, num, raw) {
    if (err)
      return res.send(err);

    res.json({ message: num + ' updated' });
  });
};

// Create endpoint /api/beers/:beer_id for DELETE
exports.deleteBeer = function(req, res) {
  // Use the Beer model to find a specific beer and remove it
  Beer.remove({ userId: req.user._id, _id: req.params.beer_id }, function(err) {
    if (err)
      return res.send(err);

    res.json({ message: 'Beer removed from the locker!' });
  });
};