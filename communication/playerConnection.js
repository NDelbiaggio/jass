const {getHands} = require('../db/hands');
const _ = require('lodash');

let players;
let hands;
let io;

let team = 0;


module.exports = function(ioParam, socket, game){
    io = ioParam;
    var addedUser = false;
    players = game.players;

    socket.on('add player', (playerName2) => {
        let playerName = `${socket.id}`; //tempo
        if(players.length > 4) return console.log('GAME FULL');
        if (addedUser) return;    
        
        game.addNewPlayer({
            playerName,
            id: socket.id,            
        },team);
        team = team == 0? 1: 0;
          
        addedUser = true;    
        playerJoined(playerName);  
        socket.emit('login',{playerName: `user ${players.length}`});

        require('../communication/rules/play')(io, socket, players);

        if(players.length == 4){
            distributeCards();
            //notify user to choose atout
            io.to(players[0].id).emit('choose atout');
            //start the game
        }            
    });
}

module.exports.disconnectPlayer = function disconnectPlayer(playerId){
    const p = players.find((p)=> p.id == playerId);
    if(!p) return;
    const indPlayer = players.indexOf(p);
    players.splice(indPlayer, 1);
    playerJoined();
}

function playerJoined(playerName){
    io.emit('player joined', {
        nbPlayers: players.length,
        playerName: playerName,
        players: _.map(players, _.partialRight(_.pick, ['playerName']))
    });    
}

function distributeCards(){
    hands = getHands();
    for (let i = 0; i < players.length; i++) {
        hands[i].player = players[i].id;
        io.to(players[i].id).emit('game start', {hand: hands[i]});                    
    }     
}
    


