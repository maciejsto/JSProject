/**
 * Created by Maciej on 9/3/2014.
 */
'use strict';

describe("MongoDB", function(){
   it("is there a server running", function(next){
        var mongoClient = require('mongodb').MongoClient;
       mongoClient.connect('mongodb://heroku_app26086154:pmkqvnf3j0tk1j7umugikfdie@ds041218.mongolab.com:41218/heroku_app26086154', function(err, db){
            expect(err).toBe(null);
            next();
       });
   });
});



//TODO add connection string from heroku mongo db -> use it in staging and production
//TODO check for the local databse connection string -> use it in local mode
