const {getCopyDeck} = require('../db/deck');
const {getRndInteger} = require('../tools');

let lstCards;
const nbPlayers = 4;
const nbCardsInHand = 9;

let hands;

exports.generateHands = function (){
    lstCards = getCopyDeck();
    hands = [];
    for (let i = 0; i < nbPlayers; i++) {
        hands.push(getHand());     
    }
    return hands;
};

function getHand(){
    let result = [];
    for (let i = 0; i < nbCardsInHand; i++) {
        let randCard = getRndInteger(0, lstCards.length-1)
        result.push(lstCards[randCard]);
        lstCards.splice(randCard, 1);
    }
    return result;        
}