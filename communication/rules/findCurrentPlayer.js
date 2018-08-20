/**
 * Returns the player _id that has to play
 * @param {Object} trick 
 * @param {Object} play 
 * @param {[Players]} players 
 * @returns {boolean} returns the _id of the player that has to play. 
 */
function findCurrentPlayerId(trick, play, players){
    if(trick.isEmpty()){
        if(trick.number == 1){
            return play.trumpChosenBy;
        }else{
            let lastTrick = play.getPreviousTrick();
            return lastTrick.leadingPlayer;
        }
    }else{
        let lastPlayerInd = players.findIndex((p)=>p._id == trick.lastPlayer);
        let nxtInd = (lastPlayerInd == players.length - 1) ? 0: lastPlayerInd + 1;
        return players[nxtInd]._id;
    }
}

/**
 * Returns the player that has to play
 * @param {Object} trick 
 * @param {Object} play 
 * @param {Object} players 
 * @returns {Player} the player that has to play
 */
function findCurrentPlayer(trick, play, players){
    let playerId = findCurrentPlayerId(trick, play, players);
    return players.find(player => player._id == playerId);
}

exports.findCurrentPlayerId = findCurrentPlayerId;
exports.findCurrentPlayer = findCurrentPlayer;