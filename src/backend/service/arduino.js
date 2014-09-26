

/*
 *Arduino model wihich provides data flow betweend Arduino board and Node server
 */
/**
 * Created by Maciej on 6/16/2014.
 */
//TODO require mandatory models/confuguration
//Arduino Service


function ArduinoModel() {
//private
    this.buffer = {
        serial: [],
        temperature: []
    };

//private function
    this.getUltraSonicSensorData = function () {
        //TODO get data from Arduino Ultrasonic Sensor to mesure distance
        console.log('getting ultrasonic data...');
    };

//public
    return {

        rawData: {data: this.buffer},

        connect: function (serialPort) {
            serialPort.open(function (err) {
                if (!err) console.log('connected .........');
            });
        },
        disconnect: function () {
            //TODO disconnect
        },

        //private functions -> GetSerialData ***************************
        getSerialData: function () {

            var cleanData = ''; // this stores the clean data
            var readData = '';  // this stores the buffer
            //return {"data": "getting serial data"};
            //TODO
            (function stream() {
                serialPort.on('data', function (data) {
                    readData += data.toString(); // append data to buffer
                    buffer.serial[0] = readData[0];
                    //console.log(buffer.serial);
                    readData = 'A' + readData + 'B';
                    if (readData.indexOf('B') >= 0 && readData.indexOf('A') >= 0) {
                        cleanData = readData.substring(readData.indexOf('A') + 1, readData.indexOf('B'));
                        readData = '';
                        //console.log("serial_raw_data: ",cleanData);
                        buffer.serial[0] = cleanData;
                    }
                });
            })();
            return buffer.serial;
        },
        //GET Temperature Data ******************************************
        getTemperatureData: function () {
            var cleanData = ''; // this stores the clean data
            var readData = '';  // this stores the buffer
            //return {"data": "getting temperature data"}
            //TODO
            (function stream() {
                serialPort.on('open', function () {
                    serialPort.on('data', function (data) {
                        readData += data.toString();
                        if (readData.indexOf('X') >= 0 && readData.indexOf('Z') >= 0) {
                            cleanData = readData.substring(readData.indexOf('Z') + 1, readData.indexOf('X'));
                            readData = '';
                            //sconsole.log("temperature_data: ", cleanData);
                            buffer.temperature[0] = cleanData;
                        }
                    })
                })
            })();
            return buffer.temperature;
        },
        //GET Internal Temp Sensor Data ***********************************
        getInternalTemperatureSensorData: function () {
            return {"data": "getting internal sensor data"}
            //TODO get temperature from Arduinos internal sensor and display
        },
        //working until here


        //TODO other functions ****************************************

        getDistance: function () {

            //distance in (m)
            var distance = getUltraSonicSensorData();    //this is still mock
        }
    };
};

module.exports = new ArduinoModel();
//module.exports = function() {



//};
