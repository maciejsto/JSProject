
// web.js
var express = require("express");
var logfmt = require("logfmt");
var app = express();

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
  res.send('Hello World2222!');
  
  //res.send(fetch_data(c));
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});


 var mongo = require('mongodb');

 var mongoUri = process.env.MONGOLAB_URI ||
   process.env.MONGOHQ_URL ||
   'mongodb://localhost/mydb';

//  //console.log(mongoUri);
//  //console.log(process.env.MONGOLAB_URI);
 
 var db_uri = "mongodb://heroku_app26086154:pmkqvnf3j0tk1j7umugikfdie@ds041218.mongolab.com:41218/heroku_app26086154";
 	mongo.Db.connect(db_uri, function (err, db) {
 	if (!err){
 		console.log("you are connected to mongodb on heroku :D");
 	}
   if (!db.collection('mongodb')){ 	
 	  db.collection('mongodb', function(er, collection) {
 	    collection.insert({'mykey': 'myvalue'}, {safe: true}, function(er,rs) {
 	    });
 	  });
   }
   //d = "";
   var c = db.collection('mongodb').find().toArray(function(err,data){
 	  console.log(data);
 	  
	 
   });
  
  
 });

