// web.js
var express = require("express");
var logfmt = require("logfmt");
var app = express();

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
  res.send('Hello World2222!');
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});

var mongo = require('mongodb');

var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/mydb';

 console.log(mongoUri);
 console.log(process.env.MONGOLAB_URI);
 
var db_uri = "mongodb://heroku_app26080265:j20c7r9l75s2t59beq2ivek63f@ds039768.mongolab.com:39768/heroku_app26080265";
mongo.Db.connect(db_uri, function (err, db) {
  db.collection('mydocs', function(er, collection) {
    collection.insert({'mykey': 'myvalue'}, {safe: true}, function(er,rs) {
    });
  });
});