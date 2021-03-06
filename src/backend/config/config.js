/**
 * Created by syzer on 4/24/2014.
 */


var config = {

    local: {
        mode: 'local',
        port: 3000,
        Serial: {
            port: "COM3",
            bauderate:9600,
            flag: false
        },
        mongoDb: {
            uri: 'mongodb://127.0.0.1:27017/test',
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
    },//end of local
    staging: {
        mode: 'staging',
        port:4000,
        Serial: {
            port: "COM3",
            bauderate:9600,
            flag: false
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
    },
    production:{
        mode: 'production,',
        port: 5000,
        Serial: {
            port: "COM3",
            bauderate:9600,
            flag: false
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
    }
}
module.exports = function(mode){
    return config[mode || process.argv[2] || 'local'] || config.local;
}


/*
module.exports = function () {
    'use strict';

    return {
        rest: {
            port: 3000
        },
        Serial: {
            port: "COM3",
            bauderate: 9600
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
*/
