const {types} = require('../../db/lstCards');
const {typesAnnounces} = require('../../db/announcesPoints');

const {findSequences} = require('./findSequences');
const {find4Jacks, find4Nines, findFour10QKA} = require('./findSquares');


function findAnnounces(hand){
    const announces = [];
    let cards = hand.slice();
    const fourJacks = find4Jacks(cards);
    if(fourJacks){
        announces.push(fourJacks.announce);
        cards = removeCardsFromAnnounceHand(cards, fourJacks.cards);
    }
    const fourNines = find4Nines(cards);
    if(fourNines){
        announces.push(fourNines.announce);
        cards = removeCardsFromAnnounceHand(cards, fourNines.cards);
    }

    const four10QKA = findFour10QKA(cards);
    if(four10QKA.length > 0){
        four10QKA.forEach(announce => {
            announces.push(announce.announce);
            cards = removeCardsFromAnnounceHand(cards, announce.cards);            
        });        
    }

    const sequences = findSequences(cards);
    if(sequences.length > 0){
        sequences.forEach(announce => {
            announces.push(announce.announce);
            cards = removeCardsFromAnnounceHand(cards, announce.cards);            
        });        
    }

    return announces;
}

function removeCardsFromAnnounceHand(handCards, cardsToRemove){
    let cards = handCards.slice();    
    cardsToRemove.forEach(card => {
        let ind = cards.indexOf(card);
        cards.splice(ind, 1);
    });
    return cards;
}

exports.findAnnounces = findAnnounces;