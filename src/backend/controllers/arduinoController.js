/**
 * Created by Maciej on 6/16/2014.
 */

/**
 *
 * @param app
 * @param arduinoModel
 */
var arduino = require('../../routes/arduino')



module.exports.controller = function(app, arduinoModel){
    //TODO
    //app.get('/arduino', arduino.arduino) //ok but could be better
    //app.get('/about', about.list);
    //app.get('/about', about.about.d(userModel));

    //var serialData = arduinoModel.getSerialData();
    var serialData_Mock = "data";
    //var temperatureData = arduinoModel.getTemperatureData();

    //var internalSensorData = arduinoModel.getInternalTemperatureSensorData();

    app.get('/arduino', function(req, res){

        //TODO invoke model
        var abstract = {
            serial   : serialData,
            temp     : temperatureData,
            internal : internalSensorData
        }

        res.render('arduino', {
            title: 'Express',
            serial_data: abstract.serial,
            temperature: abstract.temp,
            internal_sensor: abstract.internal
        });
        //res.jsonp(abstract);
    })

};