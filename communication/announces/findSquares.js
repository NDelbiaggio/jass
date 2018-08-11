const {typesAnnounces} = require('../../db/announcesPoints');

const acePower = 14;
const kingPower = 13;
const queenPower = 12;
const jackPower = 11;
const tenPower = 10;
const ninePower = 9;


function find4Jacks(cards){
    const jacks = findSquare(cards, jackPower);    
    if(jacks.length == 4) {
        return  {
            announce: typesAnnounces.fourJacks,
            cards: jacks
        }
    }
    return;
}

function find4Nines(cards){
    const nines = findSquare(cards, ninePower);    
    if(nines.length == 4) {
        return  {
            announce: typesAnnounces.fourNines,
            cards: nines
        }
    }
    return;    
}

function findFour10QKA(cards){
    const powers = [acePower, kingPower, queenPower, tenPower];
    let announces = [];
    
    powers.forEach(power =>{
        const cardsPower = findSquare(cards, power);
        if(cardsPower.length == 4){
            let announce = {
                announce: typesAnnounces.four10QKA,
                cards: cardsPower
            }
            announces.push(announce);
        }
    });
    return announces;
}

function findSquare(cards, power){
    let cardsPower = cards.filter(card => card.power == power);
    return cardsPower;
}

exports.find4Jacks = find4Jacks;
exports.find4Nines = find4Nines;
exports.findFour10QKA = findFour10QKA;