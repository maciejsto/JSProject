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

    app.set('views',  './src/front/views')
    app.set('view engine', 'ejs')
    app.get('/arduino', function(req, res){
        //TODO invoke model
        var serialData = arduinoModel.getSerialData();
        var temperatureData = arduinoModel.getTemperatureData();
        var internalSensorData = arduinoModel.getInternalTemperatureSensorData();
        var abstract = {
            "serial"   : serialData,
            "temp"     : temperatureData,
            "interna;" : internalSensorData,
        }

        res.jsonp(abstract);
    })


    app.get('*', function(req, res){
        res.render('error', function(err, html){
            res.send(html);
        });
    })
};