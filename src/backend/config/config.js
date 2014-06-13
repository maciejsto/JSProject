/**
 * Created by syzer on 4/24/2014.
 */
module.exports = function () {
    'use strict';

    return {
        rest: {
            port: 3000
        },
        mongoDb: {
            uri: 'mongodb://heroku_app26086154:pmkqvnf3j0tk1j7umugikfdie@ds041218.mongolab.com:41218/heroku_app26086154',
            options: {
                server: {
                    poolSize: 2,
                    socketOptions: {
                        keepAlive: 1
                    }
                },
                replset: {
                    poolSize: 2,
                    socketOptions : {
                        keepAlive: 1
                    }
                }
            }
        },
        seleniumConfig: {
            // http://code.google.com/p/selenium/wiki/DesiredCapabilities
            desiredCapabilities: {
//                browserName: 'chrome'     // use chrome for debugging
                browserName: 'phantomjs'
            }
            //logLevel: 'silent'
        }
    };
};

