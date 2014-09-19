/**
 * Created by syzer on 4/16/2014.
 */
module.exports = function (db) {
    "use strict";

    //private 
    var users = 'users';
    var user_name = 'user_name';
    var user_id = 'user_id';
    var testCollection = db.collection('users');
    
    
    return {
    
    	/*
    	 * @public function wchich gets collection
    	 */
    	get: function(col_name, callback){
    		var tmp = {
				user_id:  "_id",
				user_name:  "user_name"
    		};
    		
    		(db.collection(col_name).find({})).limit(4).sort({"_id":1}).toArray(function(err, data){
    			tmp = data;
    			
    			if (err){
        			return callback(err);
        		}

    			callback(null,data);
    		});
    	},
    	
    	/**
    	 * @public function creates new collection
    	 */
    	createCollection: function(new_col){
    		if (!db.collectionExists == new_col){
    			console.log('creating collection users');
    			db.createCollection(new_col);
    		}else{
    			console.log('collection: '+new_col + ' existing');
    		}
    	},
    	
    	/*
    	 * @public function insert some data
    	 */
    	insert: function(new_user_id, new_user_name){
    		db.collection('testC', function (er, collection) {
              collection.insert({'user_id': new_user_id,'user_name': new_user_name}, {safe: true}, function (er, rs) {
            	  console.log('done inserting ');
              });
    		});
    	},

        findById: function(userId){
            if (! testCollection.find(userId)) return;
          var user = testCollection.find(userId);
          return user;
        }
    	
    }
    
};


