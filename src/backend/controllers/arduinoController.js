/**
 * Created by Maciej on 6/16/2014.
 */

/**
 *
 * @param app
 * @param arduinoModel
 */
var arduino = require('../../routes/arduino')
var arduinoModell = require('../../backend/service/arduino');
var Astronaut = require('../../backend/service/astronauts');

//Arduino Controller
function ArduinoController() {

    var name = 'ArduinoController';

    //that refers to ArduinoController object
    var that = this;
    that.debug = false;

    arduino = {};

    return {

        _that: this,//_that refers to closure object

        getName: function(){
            return name;
        },

        setDebug: function(flag){
            that.debug = flag;
        },

        run: function (app, arduinoModel, io) {

            if(this.debug) {
                console.log("inside arduino controllers run function! Die bitch");
            }

            /*************************setting routes ***********************************/
            app.route('/arduino')
                .get(function(req,res,next){
                    res.render('arduino', {
                        title: 'Express',
                        serial_data: {
                            data: "sample data"
                        }
                    });
                });

            app.route('/arduino')
                .get(function (req, res, next) {

                    //TODO
                    //arduinoModel.connect();
                    //app.get('/arduino', arduino.arduino) //ok but could be better
                    //app.get('/about', about.list);
                    //app.get('/about', about.about.d(userModel));
                    var serialData_Mock = "this is sample data for test purpose";
                    var temperatureData = arduinoModel.getTemperatureData();
                    var serialData = arduinoModel.getSerialData();
                    var internalSensorData = arduinoModel.getInternalTemperatureSensorData();

                    //var serialData = serialData_Mock;
                    //var temperatureData = serialData_Mock;
                    //var internalSensorData = serialData_Mock;

                    var abstract = {
                        serial: serialData,
                        temp: temperatureData,
                        internal: internalSensorData
                    }

                    app.param('id', function (req, res, next, id) {
                        console.log("CALLED ONLY ONCE");
                    });


                    res.render('arduino', {
                        title: 'Express',
                        serial_data: {
                            data: serialData

                        },
                        temperature: temperatureData,
                        internal_sensor: abstract.internal
                    });

                    io.on('connection', function (socket) {

                        socket.emit('serialData', {message: serialData});

                        socket.on('myevent', function (data) {
                            socket.emit('serialData', {message: serialData});
                        });

                        socket.on('randomData', function (data) {
                            socket.on('myevent', function (data) {
                                socket.emit('serialData', {message: serialData});
                            });
                        });

                        socket.on('disconnect', function(socket){
                            socket.emit('disconnect');
                            console.log('client disconnected');
                        });
                    });
                });

            app.get('/arduino/:model/:id', function (req, res, next) {
                if (!req.params.model && !req.params.id){
                    console.log('caling next from model/id');
                    next();// pass control to the next router handler
                }
                console.log('arduino model: ' + req.params.model + " with id: " + req.params.id);
                res.render('arduino', {d: "some_nice_data:DDDDD"});
                //next();
            });

            /*route for arduino model*/ //working ok
            app.route('/arduino/:model')

                .get(function (req, res, next) {
                    var model = req.params.model;
                    if (model != "uno") {
                        next();
                    }else {
                        console.log("arduino modell: ", model);
                        //res.render('arduino', {d: "some_nice_data:DDDDD"});
                        res.json('arduino',{data: "sample data from model uno"});

                        //next();
                    }
                });

            /*route for arduino with id*/ // working ok
            app.route('/arduino/:id')
                .get(function (req, res, next) {
                    var id = parseInt(req.params.id);
                    if(that.debug) {
                        console.log("debug: arduino id:", id);
                    }
                    res.json('arduino', {data:"sample data from arduino id:" + req.params.id});
                /*
                res.render('/arduino', {
                    title: 'Express',
                    serial_data: abstract.serial,
                    temperature: abstract.temp,
                    internal_sensor: abstract.internal
                });
                */
                //next();
            });

        }
        //TODO next controller functions...
    };
};

module.exports = new ArduinoController();

