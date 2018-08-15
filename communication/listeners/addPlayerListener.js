const registerListeners = require('./registerListeners');
const {notifyToChooseAtout} = require('../notifiers/notifyToChoseAtout');
const notifyPlayerJoined = require('../notifiers/notifyPlayerJoined');
const {notifyPlayerLeft} = require('../notifiers/notifyPlayerLeft');
const {connectPlayerToGame} = require('../connectPlayerToGame');
const {distributeCards} = require('../rules/cardsDistribution');

const {Player} = require('../../models/player');

const eventName = 'add player';

module.exports.addPlayerListener = function(io, socket, game){
    let players = game.players;

    socket.once(eventName, (name) => {
        if(players.length < 4){
            let player = new Player({id: socket.id, name});
            game.addNewPlayer(player);
            if(players.length == 4){
                distributeCards(io, players, ()=>{
                    notifyToChooseAtout(io, game.players, game.play);
                }); 
            }
        }else{
            if(!game.isPlaceAvailable()){
                socket.emit("game full", {});
                return console.log('GAME FULL');
            }else{
                connectPlayerToGame(io, socket, game, name);
            }
        }

        socket.addedUser = true;
        socket.emit('login',{playerName: name});
        notifyPlayerJoined(io, name, players);                  
        registerListeners(io, socket, game);           
    });
}


/**
 * Remove the id (socket id) and the name of the given player to the player object. The cards of the player stay untouched. 
 * @param {*} playerId socket id
 * @param {*} game 
 */
exports.disconnectPlayer = function disconnectPlayer(io ,playerId, game){   
    console.log("disconnecting: socket.id: ", playerId);
    const player = game.getPlayerFromId(playerId);
    notifyPlayerLeft(io, player.name);
    player.id = "";
    player.name = "";

    game.status = 0;

    
}