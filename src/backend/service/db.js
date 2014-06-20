/**
 * Created by Maciej on 6/16/2014.
 */

exports.db =  function(dbUri){
    var that = this;
    var mongo = require('mongodb');
    mongo.Db.connect(dbUri,function(err, db){
        that.db = db;
    })
    return that.db;
};

