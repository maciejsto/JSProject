/*
 *Arduino model wihich provides data flow between Arduino board and Node server
 */
/**
 * Created by Maciej on 6/16/2014.
 */
//TODO require mandatory models/confuguration

module.exports = function (serialPort) {
    'use strict';

    var buffer = {
        serial: [],
        temperature: []
    };


    return {

        rawData: {data: buffer},

        //private functions
        getSerialData: function () {
            var cleanData = ''; // this stores the clean data
            var readData = '';  // this stores the buffer
            //return {"data": "getting serial data"};
            //TODO
            (function stream() {
                serialPort.on('open', function () {
                    console.log('Serial Port Opend');
                    serialPort.on('data', function (data) {

                        readData += data.toString(); // append data to buffer
                        buffer.serial[0] = readData[0];
                        //console.log(buffer.serial);

                        if (readData.indexOf('B') >= 0 && readData.indexOf('A') >= 0) {
                            cleanData = readData.substring(readData.indexOf('A') + 1, readData.indexOf('B'));
                            readData = '';
                            console.log("serial_raw_data: ", cleanData);
                            buffer.serial[0] = cleanData;
                        }
                    })
                });
            })();

            return buffer.serial;


        },

        getTemperatureData: function () {
            var cleanData = ''; // this stores the clean data
            var readData = '';  // this stores the buffer
            //return {"data": "getting temperature data"}
            //TODO
            (function stream() {
                serialPort.on('open', function () {
                    serialPort.on('data', function pleaseNameMeBecauseImLost (data) {
                        readData += data.toString();
                        if (readData.indexOf('X') >= 0 && readData.indexOf('Z') >= 0) {
                            cleanData = readData.substring(readData.indexOf('Z') + 1, readData.indexOf('X'));
                            readData = '';
                            console.log("temperature_data: ", cleanData);
                            buffer.temperature[0] = cleanData;
                        }
                    });
                });
            })();
            return buffer.temperature;
        },

        getInternalTemperatureSensorData: function () {
            return {"data": "getting internal sensor data"};
            //TODO get temperature from Arduinos internal sensor and display
        }


        //TODO other functions ****************************************
    }

}
