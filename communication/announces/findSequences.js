const {types} = require('../../db/lstCards');
const {typesAnnounces} = require('../../db/announcesPoints');

function findSequences(cards){
    let handSplitted = splitCardsByKind(cards);
    let announces = [];
    handSplitted.forEach(typeCards =>{
        typeCards.sort((a, b)=> a.power >= b.power);
        let cardsInSequence = 1;
        let i;
        for (i = typeCards.length -1 ; i > 0; i--) {
            let card = typeCards[i];
            let prevCard = typeCards[i-1];

            if(card.power == prevCard.power + 1 && cardsInSequence < 5){
                cardsInSequence++;
            }else{
                if(cardsInSequence >= 3){
                    let announce = createAnnounce(cardsInSequence, i, typeCards);
                    announces.push(announce);
                }
                cardsInSequence = 1;
            }            
        }
        if(cardsInSequence >= 3){
            let announce = createAnnounce(cardsInSequence, i, typeCards);
            announces.push(announce);
        }      
    });
    return announces;
}

function createAnnounce(seqNumber, indFirst ,cards){
    switch (seqNumber) {
        case 3:
            return {
                announce: typesAnnounces.sequence3,
                cards: cards.slice(indFirst, indFirst + seqNumber)
            }
        case 4:
            return {
                announce: typesAnnounces.sequence4,
                cards: cards.slice(indFirst, indFirst + seqNumber)
            }
        case 5:
            return {
                announce: typesAnnounces.sequence5,
                cards: cards.slice(indFirst, indFirst + seqNumber)
            }
    }
    return;
}

/**
 * Split the hand into an array per type
 * @param {[Object]} cards 
 * @returns {[Object]} handSplitted returns array with 4 arrays. One per type.
 */
function splitCardsByKind(cards){
    let handSplitted = [];
    let typesLst = [types.diamonds, types.spades, types.clubs, types.hearts];
    typesLst.forEach(type => {
        let split = cards.filter(card => card.type == type);
        handSplitted.push(split);
    });
    return handSplitted;
}

exports.findSequences = findSequences;