/**
 * Created by Maciej on 9/9/2014.
 */

var socket = require('socket.io');


module.export.listen = function(server){

    var io = socket.listen(server);
    return io;
}