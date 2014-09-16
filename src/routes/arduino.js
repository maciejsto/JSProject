
/*
 * GET home page.
 */
/**
 * Created by Maciej on 6/16/2014.
 */
//TODO add arduino model here ?? ****************
'use strict';
var services = require("../../src/backend/config/serviceConfig").services;
var sm = require("../../src/backend/service/manager")(services);

//Arduino Route
/*
exports.arduino = {
    id: function(id){
        console.log('arduino with id: '+ id);
    }

};
*/

var astronaut = sm.get('astronaut');
console.log('astronaut',astronaut);

exports.arduino = function(req, res,next){

    res.render('arduino', { title: 'Arduino Route' ,
                            astronaut: astronaut});

};






