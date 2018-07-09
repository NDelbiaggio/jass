const {Game} = require('../models/game');

module.exports = function(server){
    var io = require('socket.io')(server);
    let game = new Game();


    io.on('connection', (socket) => {
        require('../communication/playerConnection')(io, socket, game)
        
        const {disconnectPlayer} = require('../communication/playerConnection');
        
        socket.on('disconnect', () => {
            disconnectPlayer(socket.id);
            console.log('I disconnect');
        });
        
    });
    
}