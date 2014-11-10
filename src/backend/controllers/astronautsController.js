


var Astronaut = require('../../backend/service/astronauts');


module.exports = function(){

    var that = this;
    that.debug = false;
    that.name = 'astronautsController';

    return {

        setDebug: function(flag){
            that.debug = flag;
        },

        getName: function(){
            return that.name;
        },

        run: function(app){

            if(that.debug)
                console.log('debug: inside astronaut run function ');

            app.route('/users')

                //use mongoose to get all astronauts from database
                .get(function(req, res){
                    Astronaut.find(function(err, astronauts){
                        if(err)
                            res.send(err)
                        res.json(astronauts);   // return all astronauts in json format
                    });
                })

                //create astronat and send back all astronauts from database
                .post(function(req, res){
                    Astronaut.create({
                        name: "first astronaut"
                    }, function(err, astronaut){
                        if(err)
                            res.send(err);

                        Astronaut.find(function(err, astronauts){
                            if(err)
                                res.send(err)
                            res.json(astronauts);
                        });
                    });
                });
            app.route('users/:user_id')
                .delete(function(req, res){
                    //todo
                });
            return this;
        }//end of run function
    };

};