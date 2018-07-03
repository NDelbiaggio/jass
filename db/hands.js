const {getCopyCards} = require('../db/lstCards');
const {getRndInteger} = require('../tools');
const {Hand} = require('../models/hand');

let lstCards;
const nbPlayers = 4;
const nbCardsInHand = 9;

exports.getHands = function getHands(){
    lstCards = getCopyCards();
    let hands = [];
    for (let i = 0; i < nbPlayers; i++) {
        let hand = new Hand({
            cards: getHand()
        });
        hands.push(hand)        
    }
    return hands;
}

function getHand(){
    let result = [];
    for (let i = 0; i < nbCardsInHand; i++) {
        let randCard = getRndInteger(0, lstCards.length-1)
        result.push(lstCards[randCard]);
        lstCards.splice(randCard, 1);
    }
    return result;        
}