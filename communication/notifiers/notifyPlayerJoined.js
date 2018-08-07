const _ = require('lodash');

const eventName = "player joined";

//brodcast the number of players, the name of the new player, and all the players name
/**
 * Notifies all the players that a new player joined. Send the nb of players, name of the new one, and all players name
 * @param {*} io 
 * @param {*} player 
 * @param {*} players 
 */
function notifyPlayerJoined(io, player, players){
    io.emit(eventName, {
        nbPlayers: players.length,
        playerName: player.name,
        players: _.map(players, _.partialRight(_.pick, ['name']))
    });    
}

module.exports = notifyPlayerJoined;