const {findCurrentPlayer} = require('../rules/findCurrentPlayer')

const eventName = 'turn';

/**
 * Emit an event 'turn' to the player received as a parameter, and emit event 'turn' with the name of the player that has to play.
 * @param {*} io or socket to emit to one client
 * @param {*} playerId 
 */
function notifyPlayerToPlay(io, playerName){
    io.emit(eventName, ({player: playerName}));
}

/**
 * Emit an event 'turn' to the player that has to play.
 * @param {*} io 
 * @param {*} plie 
 * @param {*} play 
 * @param {*} players 
 */
function notifyCurrentPlayerToPlay(io, plie, play, players ){
    let player = findCurrentPlayer(plie, play, players);
    notifyPlayerToPlay(io, player.name);
}

/**
 * Emit an event 'turn' to the player that is after the current player in the array. If the current player is the last one, the event is sent to the first one.
 * @param {*} io 
 * @param {*} players 
 * @param {*} currentPlayerInd index of the player in the array of players
 */
function notifyNextPlayerToPlay (io, players, currentPlayerInd){
    const next = currentPlayerInd == players.length -1? 0: currentPlayerInd + 1;
    let player = players[next];
    notifyPlayerToPlay(io, player.name);
    return next;
}

exports.notifyPlayerToPlay = notifyPlayerToPlay;
exports.notifyNextPlayerToPlay = notifyNextPlayerToPlay;
exports.notifyCurrentPlayerToPlay = notifyCurrentPlayerToPlay;