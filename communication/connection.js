const {addPlayerListener, disconnectPlayer} = require('../communication/listeners/addPlayerListener');

const {Game} = require('../models/game');

exports.connection = function(server){
    io = require('socket.io')(server);
    let game = new Game();

    io.on('connection', (socket) => {
        addPlayerListener(io, socket, game);
        
        socket.on('disconnect', (reason) => {
            //console.log("disconnect, reason: " + reason);
            
            if(socket.addedUser){
                disconnectPlayer(socket.id, game);
            }
        });        
    });    
}
