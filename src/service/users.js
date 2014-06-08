/**
 * Created by syzer on 4/16/2014.
 */
module.exports = function (db) {
    "use strict";

    //private 
    
    var users = 'users';
    
    
    return {
    
    	//public 
    	get: function(){
    		var tmp = {
				a:  "user_id";
				b:  "user_name";
    		};
    		db.collection(users).find().toArray(function(err, data){
    			console.log(data);
    			tmp = data;
    		});
    		return tmp;
    	}
    }
    
};


