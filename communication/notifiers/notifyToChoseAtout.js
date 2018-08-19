const {getCopyCard, types} = require('../../db/lstCards');

const d7 = getCopyCard(types.diamonds, 7);
const eventName = "choose atout";

function notifyToChooseAtout (io, players, play){
    const playerAtout = getPlayerToChooseAtout(players, play);
    console.log("The player that has to choose atout is contacted. Player: ", playerAtout.name);
    io.emit(eventName, {player: playerAtout.name});
}

/**
 * Return the player that has to choose atout before chibrer
 * @param {*} players 
 * @param {*} play 
 * @returns {Player} player that has to choose atout before chibrer
 */
function getPlayerToChooseAtout(players, play){
    const indPlayer = getPlayerIndToChooseAtout(players, play);
    return players[indPlayer];
}

function getPlayerIndToChooseAtout(players, play){
    if(!play.atoutChosenBy){
        // Returns the player who has the d7
        return players.findIndex(p=> p.cards.find(c => c.id == d7.id));
    } else {
        
        //Determine the next player to choose atout
        let indPlayer = players.findIndex(p => p._id == play.atoutChosenBy);
        let indNxtPlayer = (indPlayer == players.length - 1) ? 0: indPlayer + 1;
        return indNxtPlayer;
    }
}

function getChibrePlayer(players, play){
    const indPlayer = getPlayerIndToChooseAtout(players, play);
    const chibrePlayerInd = indPlayer + 2 >= players.length? indPlayer - 2 : indPlayer + 2;
    return players[chibrePlayerInd];
}

exports.notifyToChooseAtout = notifyToChooseAtout;
exports.getPlayerToChooseAtout = getPlayerToChooseAtout;
exports.getChibrePlayer = getChibrePlayer;