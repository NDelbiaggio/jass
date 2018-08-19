/**
 * Returns the player _id that has to play
 * @param {Object} plie 
 * @param {Object} play 
 * @param {[Players]} players 
 * @returns {boolean} returns the _id of the player that has to play. 
 */
function findCurrentPlayerId(plie, play, players){
    if(plie.isEmpty()){
        if(plie.number == 1){
            return play.atoutChosenBy;
        }else{
            let lastPlie = play.getPreviousPlie();
            return lastPlie.leadingPlayer;
        }
    }else{
        let lastPlayerInd = players.findIndex((p)=>p._id == plie.lastPlayer);
        let nxtInd = (lastPlayerInd == players.length - 1) ? 0: lastPlayerInd + 1;
        return players[nxtInd]._id;
    }
}

/**
 * Returns the player that has to play
 * @param {Object} plie 
 * @param {Object} play 
 * @param {Object} players 
 * @returns {Player} the player that has to play
 */
function findCurrentPlayer(plie, play, players){
    let playerId = findCurrentPlayerId(plie, play, players);
    return players.find(player => player._id == playerId);
}

exports.findCurrentPlayerId = findCurrentPlayerId;
exports.findCurrentPlayer = findCurrentPlayer;