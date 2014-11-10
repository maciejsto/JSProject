


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

            //list all astrnonats in databse--------------------------------------------------------------------------------
            app.route('/users')
                //use mongoose to get all astronauts from database
                .get(function(req, res){


                    Astronaut.find(function(err, astronauts){
                        if(err)
                            res.send(err)

                        console.log('found astronauts');
                        res.send(JSON.stringify(astronauts));   // return all astronauts in json format
                    });
                })

            //create astronat and send back all astronauts from database-------------------------------------------------
            //app.route('/users')
                .post(function(req, res){
                    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
                    var uniqid = randLetter + Date.now();

                    Astronaut.create({

                        "name": "John D",
                        "walkedOnMoon": true,
                        "_id": uniqid,
                        "__v": 1,
                        "lastupdated": new Date(),
                        "skills": [
                            "floatings",
                            "repairings satellites"
                        ],
                        "missions": ['1']

                    }, function(err, astronauts){
                        if(err)
                            //console.log(err)
                            res.send(err)
                        console.log("created astronaut");
                        Astronaut.find(function(err, astronauts){
                            if(err)
                                //res.send(err)
                            console.log('created new astronaut');
                            res.send(JSON.stringify(astronauts));
                        });
                    });
                })
                .delete(function(req, res) {
                    Astronaut.collection.remove(function (err) {
                        if (err)
                            res.send(err)
                        console.log('deleting astronaut collection');
                        Astronaut.find(function(err, astronauts){
                           if(err)
                               res.send(err)

                            console.log("deleted astronauts");
                            res.send(JSON.stringify(astronauts));
                        });
                    });

                });
<<<<<<< HEAD
            app.route('users/:user_id')
                .delete(function(req, res){
                    //TOOD
=======
            //delete astronaut from database-------------------------------------------------------------------------------
            app.route('users/:_id')
                .delete(function(req, res){
                    //todo
                    Astronaut.remove({
                        _id : req.params._id
                    }, function(err, astronaut){
                        if(err)
                            res.semd(err);
                        Astronaut.find(function(err,astronauts){
                            if(err)
                                res.send(err)
                            console.log('deleted astronaut');
                            res.send(JSON.stringify(astronauts));
                        });
                    });
                });

            //application-------------------------------------------------------------------------------------------------
            app.route('*')
                .get(function(req,res){
                    //res.sendfile();
                    //todo
>>>>>>> 6bc27411231dc57b33cc0338775c929d2e5e8770
                });


            return this;
        }//end of run function
    };

};