const {addPlayerListener, disconnectPlayer} = require('../communication/listeners/addPlayerListener');

const {Game} = require('../models/game');

exports.connection = function(server){
    io = require('socket.io')(server);
    let game = Game.createGame();

    io.on('connection', (socket) => {
        addPlayerListener(io, socket, game);
        
        socket.on('disconnect', (reason) => {
            //console.log("disconnect, reason: " + reason);
            
            if(socket.addedUser){
                disconnectPlayer(io, socket.id, game);
            }
        });        
    });    
}
