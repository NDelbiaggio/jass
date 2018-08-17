const registerListeners = require('./registerListeners');

const {notifyToChooseAtout} = require('../notifiers/notifyToChoseAtout');
const notifyPlayerJoined = require('../notifiers/notifyPlayerJoined');
const {notifyPlayerLeft} = require('../notifiers/notifyPlayerLeft');

const {connectPlayerToGame} = require('../connectPlayerToGame');
const {distributeCards} = require('../rules/cardsDistribution');


const eventName = 'add player';

module.exports.addPlayerListener = function(io, socket, game){
    let players = game.players;

    socket.once(eventName, (name) => {
        if(game.isPlaceAvailable()){
            let player = game.setNewPlayer(socket.id, name);
            if(!game.isPlaceAvailable()){
                if(game.playersHaveCards()){
                    connectPlayerToGame(io, socket, game, player);
                } else{
                    distributeCards(io, players, ()=>{
                        notifyToChooseAtout(io, game.players, game.play);
                    }); 
                }                
            }
        }else{
            socket.emit("game full", {});
            return console.log('GAME FULL');
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