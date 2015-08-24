module.exports = function(io){
    //----------------------------------------------- SOCKETS -----------------------------------------------//

/* ****using socket to receive request from browser , process it , send to client(raspberry) and receive response*******  */
io.on('connection', function (socket) {
    
    
    
    var clients = [];
    socket.setMaxListeners(0);
    console.log('client connected in web.js');
    
    
    clients.push(socket);
    
    
    
    var i = clients.indexOf(socket);
    
    var interval = setInterval(function () {
        
         socket.emit('server:msg', {data: random(20,30)});
        
    }, 1000);
    
    console.log("socketID:",clients[i].id);
    
        /*wait for button state change True/False*/
        socket.on('stateChanged', function(data){
            console.log('state changed '+ data.state);

            socket.broadcast.emit('updateState',{data: data});
            //socket.emit('updateState', {data:'new_state'});
        });

        /*do something on client event*/    
        socket.on('client', function(data){
            console.log('form client:', data);
            socket.emit('server', {data: 'data from server'});
        });
        
        socket.on('arduino:msg', function(data) {
            console.log(data);
            socket.emit('server:msg', {data: random(20,30)});
            socket.broadcast.emit('client:send', {msg: 'data for client from arduino controller'})
        })
        socket.on('arduino:msg2', function(data) {
            socket.broadcast.emit('client:send2', {msg: 'another data for client from arduino controller'})
            console.log(data);
        })
        
        /*do task on disconnect*/
        socket.on('disconnect', function(socket){
            
            while(clients.length > 0){
                clients[i] = null;
                clients.pop();
            }
            console.log('client disconnecting from server', clients);
            
        });
        
        //TODO other tasks
});

function random (low, high) {
    return Math.random() * (high - low) + low;
}

}