const {getHands} = require('../db/hands');


module.exports = function(server){
    var io = require('socket.io')(server);
    //const {distributeCards} = require('./distributeCards');

    let players = [];
    let nextPlayer = 0;
    
    io.on('connection', (socket) => {
        var addedUser = false;
        console.log('There is a connection')
        
        socket.on('add player', (username) => {
            if(players.length > 4) throw new Error('This game is full');
            if (addedUser) return;
            
            players.push({
                id: socket.id,
                username: username
            });
    
            socket.username = username;
            addedUser = true;
    
            socket.emit('login', {
                username: socket.username,
                numUsers: players.length
            });
    
            io.emit('player joined', {
                nbPlayers: players.length
            });
    
            if(players.length == 4){
                const hands = getHands();
                for (let i = 0; i < players.length; i++) {
                    hands[i].player = players[i].id;
                    io.to(players[i].id).emit('game start', {hand: hands[i]});                    
                }
            }    
        });
    
        socket.on('disconnect', () => {
            if (addedUser) {        
                io.emit('player joined', {nbPlayers: players.length});    
                const p = players.find((p)=> p.id == socket.id);
                const indPlayer = players.indexOf(p);
                players.splice(indPlayer, 1);
            }
        });
    });
    
}