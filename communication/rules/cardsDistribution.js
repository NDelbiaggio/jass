const {generateHands} = require('../../db/hands');

const eventName = "cards distribution"

module.exports = function distributeCards(io, players, cb){
    let hands = generateHands();
    for (let i = 0; i < players.length; i++) {
        let player = players[i];
        player.setHand(hands[i]);
        
        io.to(player.id).emit(eventName, {cards: player.cards});                    
    }
    cb();     
}
