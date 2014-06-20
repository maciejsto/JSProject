/**
 * Created by Maciej on 6/16/2014.
 */

/*
   *Arduino model wihich provides data flow betweend Arduino board and Node server
 */
//TODO require mandatory models/confuguration

module.exports = function(serialPort) {

    //public function/variables
    this.buffer = [];   // public containter for incoming data

    return {
        //private fnctions/variables

        //private fields
        rawData: {"data":this.buffer},


        //private functions
        getSerialData: function(){
            return {"data": "getting serial data"}
            //TODO

        },

        getTemperatureData: function(){
           return {"data": "getting temperature data"}
           //TODO
        },

        getInternalTemperatureSensorData: function(){
            return {"data": "getting internal sensor data"}
            //TODO
        },


    }

}