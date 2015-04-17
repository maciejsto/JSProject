var express = require('express');
var fs = require('fs');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.set('port', process.env.PORT || 8080);
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

//(0 < F < 100           number of friends
//(0 < A < 10000).       number of adresses 

//Sample code to read in test cases:
var file = fs.readFileSync('input.txt','utf8');
var addresses = []
file.toString().split('\n').forEach(function(line){
    var container = []
    var ar_of_distances = []
    
    if (line === '') return;
    var sorted = line.split(' ');
    //var sorted = line.split(" ").sort(function(a, b){return a-b});
    var friends_num = sorted[0]
    var addresses = sorted.splice(1,sorted.length)
    
    var min = parseInt(Math.min.apply(null, addresses));
    var max = parseInt(Math.max.apply(null, addresses));
    
    var dist = 0
    
    //console.log('min: ', min);
    //console.log('max: ', max);
    
    var results = []
    for (var i = min; i <= max; i++){
      dist = get_distance(addresses, i);
      results.push(dist)
    }
    
    var ret = results.sort(function(a, b) {return a - b})      
    console.log(Math.min.apply(null,ret));
  
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});


function get_distance(addresses, i){
  var distance = 0;
  addresses.forEach(function(address){
    distance += Math.abs(parseInt(address) - i);
  });
  return distance;
}