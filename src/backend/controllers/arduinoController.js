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

//Arduino Controller
function ArduinoController() {

    var name = 'ArduinoController';

    return {

        getName: function(){
            return name;
        },

        run: function (app, arduinoModel, io) {

            app.route('/arduino')
                .get(function (req, res, next) {

                //TODO

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

                    socket.emit('serialData', { message: serialData });
                    socket.on('myevent', function (data) {
                        socket.emit('serialData', { message: serialData});
                    });

                    socket.on('randomData', function (data) {
                        socket.on('myevent', function (data) {
                            socket.emit('serialData', { message: serialData});
                        });
                    });

                });

                /*
                 io.on('disconnect', function(socket){
                 socket.emit('disconnect');
                 console.log('client disconnected');
                 });
                 */
            });

        /*
            app.all('/arduino/:model?/:id?', function (req, res, next) {
                console.log('arduino model: ' + req.params.model + " with id: " + req.params.id);
                res.render('about', {d: "some_nice_data:DDDDD"});
                next();
            });

            app.all('/arduino/:model?', function (req, res, next) {
                console.log("arduino model: ", req.params);
                res.render('about', {d: "some_nice_data:DDDDD"});
                next();
            });


            app.all('/arduino/:id?', function (req, res, next) {
                console.log("arduino id:", req.params);
                res.render('/arduino', {
                    title: 'Express',
                    serial_data: abstract.serial,
                    temperature: abstract.temp,
                    internal_sensor: abstract.internal
                });
                next();
            });
            */
        }

    };
};

module.exports = new ArduinoController();

