/**
 * Created by Maciej on 9/3/2014.
 */
var config = {
    local: {
        mode: 'local',
        port:3000
    },
    staging:{
        mode: 'staging',
        port:4000
    },
    production:{
        mode: 'production',
        port:5000
    }
}


module.exports = function(mode){
    return config[mode || process.argv[2] || 'local'] || config.local;
}
