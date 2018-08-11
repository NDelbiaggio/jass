const {addPlayerListener, disconnectPlayer} = require('../communication/listeners/addPlayerListener');

const {Game} = require('../models/game');

module.exports = function(server){
    var io = require('socket.io')(server);
    let game = new Game();

    io.on('connection', (socket) => {
        console.log("connection: "+new Date().getTime())
        addPlayerListener(io, socket, game);
        
        socket.on('disconnect', (reason) => {
            console.log("disconnect, reason: " + reason);
            
            if(socket.addedUser){
                disconnectPlayer(socket.id, game);
                console.log('I disconnect');
            }
        });

        socket.on('disconnecting', (reason)=>{
            console.log("Disconnecting, reson "+reason+": "+new Date().getTime())
            //console.log("disconnecting, reason: " + reason);
        })
        
    });
    
}