const registerListeners = require('./registerListeners');
const {notifyToChooseAtout} = require('../notifiers/notifyToChoseAtout');
const notifyPlayerJoined = require('../notifiers/notifyPlayerJoined');
const distributeCards = require('../rules/cardsDistribution');

const {Player} = require('../../models/player');

const eventName = 'add player';
let team = 0;

module.exports.addPlayerListener = function(io, socket, game){
    var addedUser = false;
    let players = game.players;

    socket.on(eventName, (playerName2) => {
        let playerName = `${socket.id}`; //tempo
        if(players.length > 4) return console.log('GAME FULL');
        if (addedUser) return; // avoid a player to be connected twice        
        addedUser = true; 
        socket.addedUser = true;

        let player = new Player({ name: playerName, id: socket.id,})
        game.addNewPlayer(player, team);
        team = team == 0? 1: 0;
        notifyPlayerJoined(io, player, players);  
        
        socket.emit('login',{playerName: `user ${players.length}`});
        
        registerListeners(io, socket, game);

        if(players.length == 4){
            distributeCards(io, players, ()=>{
                notifyToChooseAtout(io, game.players, game.play);
            }); 
        }            
    });
}

module.exports.disconnectPlayer = function disconnectPlayer(playerId, game){
    const indPlayer = game.players.findIndex((p)=> p.id == playerId);
    if(indPlayer == -1) return;
    players.splice(indPlayer, 1);
    console.log("IN")
    //notifyPlayerJoined();
}




    


