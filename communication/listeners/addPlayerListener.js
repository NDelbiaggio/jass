const registerListeners = require('./registerListeners');

const {notifyToChooseTrump} = require('../notifiers/notifyToChoseTrump');
const notifyPlayerJoined = require('../notifiers/notifyPlayerJoined');
const {notifyPlayerLeft} = require('../notifiers/notifyPlayerLeft');

const {connectPlayerToGame} = require('../connectPlayerToGame');
const {distributeCards} = require('../rules/cardsDistribution');


const eventName = 'add player';

module.exports.addPlayerListener = function(io, socket, game){
    let players = game.players;

    socket.on(eventName, (name) => {
        if(game.isPlaceAvailable()){
            let player = game.setNewPlayer(socket.id, name);
            if(!game.isPlaceAvailable()){
                if(game.playersHaveCards()){
                    connectPlayerToGame(io, socket, game, player);
                } else{
                    distributeCards(io, players, ()=>{
                        notifyToChooseTrump(io, game.players, game.play);
                    }); 
                }
                console.log('Last player has been added: ', name);            
            }
            console.log('A player joined: ', name);            
        }else{
            socket.emit("game full", {});
            
            return console.log('GAME FULL');
        }

        console.log("addplayer - emit login, notifyPlayerJoined - register listeners");
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
exports.disconnectPlayer = function disconnectPlayer(io ,socketId, game){   
    console.log("disconnecting: socket.id: ", socketId);
    let name = game.getPlayerFromId(socketId).name;
    game.unsetPlayer(socketId);
    notifyPlayerLeft(io, name);    
}