/*
 * GET home page.
 */
/**
 * Created by Maciej on 6/16/2014.
 */
//TODO add arduino model here ?? ****************
//yes you can use closure, and lexical scoping
module.exports = function (arduinoModel) {
    'use strict';

    return {
        arduino: function (req, res) {
            res.render('arduino', { title: 'Express' });
        }
    };

};
