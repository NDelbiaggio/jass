const {getCopyCard, types} = require('../../db/deck');

const d7 = getCopyCard(types.diamonds, 7);
const eventName = "choose trump";

function notifyToChooseTrump (io, players, play){
    const trumpPlayer = getPlayerToChooseTrump(players, play);
    console.log("The player that has to choose trump is contacted. Player: ", trumpPlayer.name);
    io.emit(eventName, {player: trumpPlayer.name});
}

/**
 * Return the player that has to choose trump before chibrer
 * @param {*} players 
 * @param {*} play 
 * @returns {Player} player that has to choose trump before chibrer
 */
function getPlayerToChooseTrump(players, play){
    const indPlayer = getPlayerIndToChooseTrump(players, play);
    return players[indPlayer];
}

function getPlayerIndToChooseTrump(players, play){
    if(!play.trumpChosenBy){
        // Returns the player who has the d7
        return players.findIndex(p=> p.cards.find(c => c.id == d7.id));
    } else {        
        //Determine the next player to choose trump
        let indPlayer = players.findIndex(p => p._id == play.trumpChosenBy);
        let indNxtPlayer = (indPlayer == players.length - 1) ? 0: indPlayer + 1;
        return indNxtPlayer;
    }
}

function getChibrePlayer(players, play){
    const indPlayer = getPlayerIndToChooseTrump(players, play);
    const chibrePlayerInd = indPlayer + 2 >= players.length? indPlayer - 2 : indPlayer + 2;
    return players[chibrePlayerInd];
}

exports.notifyToChooseTrump = notifyToChooseTrump;
exports.getPlayerToChooseTrump = getPlayerToChooseTrump;
exports.getChibrePlayer = getChibrePlayer;