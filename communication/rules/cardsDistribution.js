const {generateHands} = require('../../db/hands');

const {writePlayersWithHands} = require('../../developmentTools/recordGame');

const eventName = "cards distribution";

function distributeCards(io, players, cb){
    console.log("Cards are distributed");
    let hands = generateHands();
    for (let i = 0; i < players.length; i++) {
        let player = players[i];
        player.setHand(hands[i]);
        
        sendCards(io, player.socketId, player.cards);                           
    }

    writePlayersWithHands(players, cb);
    // cb(); 
}

/**
 * Send the cards to the player
 * @param {*} io 
 * @param {*} destination player socket id
 * @param {*} cards of the player
 */
function sendCards(io, destination, cards){
    io.to(destination).emit(eventName, {cards}); 
}

exports.sendCards = sendCards;
exports.distributeCards = distributeCards;
