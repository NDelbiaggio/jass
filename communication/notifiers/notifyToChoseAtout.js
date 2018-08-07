const {getCopyCard, types} = require('../../db/lstCards');

const d7 = getCopyCard(types.diamonds, 7);
const eventName = "choose atout";

module.exports = function (io, players, play){
    let playerHasToChose;
    if(!play.atoutChosenBy){
        // Returns the player who has the d7
        playerHasToChose = players.find(p=> {
            return p.cards.find(c => c._id == d7._id)
        });
    } else {
        //Determine the next player to choose atout
        let indPlayer = players.findIndex(p => p.id == play.atoutChosenBy);
        let indNxtPlayer = indPlayer == players.length -1? 0: indPlayer + 1;
        playerHasToChose = players[indNxtPlayer];
    }
    io.to(playerHasToChose.id).emit(eventName);
}