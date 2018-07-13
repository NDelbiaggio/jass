const { Card } = require('../models/card');

const types = {
    diamonds: 'diamonds',
    spades: 'spades',
    hearts: 'hearts',
    clubs: 'clubs'
};

const imgPath = "https://deckofcardsapi.com/static/img/"

const cards = [
    new Card({type: types.diamonds, name: 'six', power: 6, atoutPower: 1, sortIndex: 1, atoutValue: 0, value: 0 , imgSrc: `${imgPath}6D.png`}),
    new Card({type: types.diamonds, name: 'seven',power: 7, atoutPower: 2, sortIndex: 2, atoutValue: 0, value: 0, imgSrc: `${imgPath}7D.png`}),
    new Card({type: types.diamonds, name: 'eight', power: 8, atoutPower: 3, sortIndex: 3, atoutValue: 0,value: 0, imgSrc: `${imgPath}8D.png`}),
    new Card({type: types.diamonds, name: 'nine', power: 9, atoutPower: 8, sortIndex: 4, atoutValue: 14,value: 0, imgSrc: `${imgPath}9D.png`}),
    new Card({type: types.diamonds, name: 'ten', power: 10, atoutPower: 4, sortIndex: 5, atoutValue: 10,value: 10, imgSrc: `${imgPath}0D.png`}),
    new Card({type: types.diamonds, name: 'valet', power: 11, atoutPower: 9, sortIndex: 6, atoutValue: 20,value: 2, imgSrc: `${imgPath}JD.png`}),
    new Card({type: types.diamonds, name: 'queen', power: 12, atoutPower: 5, sortIndex: 7, atoutValue: 3,value: 3, imgSrc: `${imgPath}QD.png`}),
    new Card({type: types.diamonds, name: 'king', power: 13, atoutPower: 6, sortIndex: 8, atoutValue: 4,value: 4, imgSrc: `${imgPath}KD.png`}),
    new Card({type: types.diamonds, name: 'ace', power: 14, atoutPower: 7, sortIndex: 9, atoutValue: 11,value: 11, imgSrc: `${imgPath}AD.png`}),
    
    new Card({type: types.clubs, name: 'six', power: 6, atoutPower: 1, sortIndex: 1 + 9, atoutValue: 0,value: 0, imgSrc: `${imgPath}6C.png`}),
    new Card({type: types.clubs, name: 'seven', power: 7, atoutPower: 2, sortIndex: 2 + 9, atoutValue: 0,value: 0, imgSrc: `${imgPath}7C.png`}),
    new Card({type: types.clubs, name: 'eight', power: 8, atoutPower: 3, sortIndex: 3 + 9, atoutValue: 0,value: 0, imgSrc: `${imgPath}8C.png`}),
    new Card({type: types.clubs, name: 'nine', power: 9, atoutPower: 8, sortIndex: 4 + 9, atoutValue: 14,value: 0, imgSrc: `${imgPath}9C.png`}),
    new Card({type: types.clubs, name: 'ten', power: 10, atoutPower: 4, sortIndex: 5 + 9, atoutValue: 10,value: 10, imgSrc: `${imgPath}0C.png`}),
    new Card({type: types.clubs, name: 'valet', power: 11, atoutPower: 9, sortIndex: 6 + 9, atoutValue: 20,value: 2, imgSrc: `${imgPath}JC.png`}),
    new Card({type: types.clubs, name: 'queen', power: 12, atoutPower: 5, sortIndex: 7 + 9, atoutValue: 3,value: 3, imgSrc: `${imgPath}QC.png`}),
    new Card({type: types.clubs, name: 'king', power: 13, atoutPower: 6, sortIndex: 8 + 9, atoutValue: 4,value: 4, imgSrc: `${imgPath}KC.png`}),
    new Card({type: types.clubs, name: 'ace', power: 14, atoutPower: 7, sortIndex: 9 + 9, atoutValue: 11,value: 11, imgSrc: `${imgPath}AC.png`}),
    
    new Card({type: types.hearts, name: 'six', power: 6, atoutPower: 1, sortIndex: 1 + 18, atoutValue: 0,value: 0, imgSrc: `${imgPath}6H.png`}),
    new Card({type: types.hearts, name: 'seven', power: 7, atoutPower: 2, sortIndex: 2 + 18, atoutValue: 0,value: 0, imgSrc: `${imgPath}7H.png`}),
    new Card({type: types.hearts, name: 'eight', power: 8, atoutPower: 3, sortIndex: 3 + 18, atoutValue: 0,value: 0, imgSrc: `${imgPath}8H.png`}),
    new Card({type: types.hearts, name: 'nine', power: 9, atoutPower: 8, sortIndex: 4 + 18, atoutValue: 14,value: 0, imgSrc: `${imgPath}9H.png`}),
    new Card({type: types.hearts, name: 'ten', power: 10, atoutPower: 4, sortIndex: 5 + 18, atoutValue: 10,value: 10, imgSrc: `${imgPath}0H.png`}),
    new Card({type: types.hearts, name: 'valet', power: 11, atoutPower: 9, sortIndex: 6 + 18, atoutValue: 20,value: 2, imgSrc: `${imgPath}JH.png`}),
    new Card({type: types.hearts, name: 'queen', power: 12, atoutPower: 5, sortIndex: 7 + 18, atoutValue: 3,value: 3, imgSrc: `${imgPath}QH.png`}),
    new Card({type: types.hearts, name: 'king', power: 13, atoutPower: 6, sortIndex: 8 + 18, atoutValue: 4,value: 4, imgSrc: `${imgPath}KH.png`}),
    new Card({type: types.hearts, name: 'ace', power: 14, atoutPower: 7, sortIndex: 9 + 18, atoutValue: 11,value: 11, imgSrc: `${imgPath}AH.png`}),
    
    new Card({type: types.spades, name: 'six', power: 6, atoutPower: 1, sortIndex: 1 + 27, atoutValue: 0,value: 0, imgSrc: `${imgPath}6S.png`}),
    new Card({type: types.spades, name: 'seven', power: 7, atoutPower: 2, sortIndex: 2 + 27, atoutValue: 0,value: 0, imgSrc: `${imgPath}7S.png`}),
    new Card({type: types.spades, name: 'eight', power: 8, atoutPower: 3, sortIndex: 3 + 27, atoutValue: 0,value: 0, imgSrc: `${imgPath}8S.png`}),
    new Card({type: types.spades, name: 'nine', power: 9, atoutPower: 8, sortIndex: 4 + 27, atoutValue: 14,value: 0, imgSrc: `${imgPath}9S.png`}),
    new Card({type: types.spades, name: 'ten', power: 10, atoutPower: 4, sortIndex: 5 + 27, atoutValue: 10,value: 10, imgSrc: `${imgPath}0S.png`}),
    new Card({type: types.spades, name: 'valet', power: 11, atoutPower: 9, sortIndex: 6 + 27, atoutValue: 20,value: 2, imgSrc: `${imgPath}JS.png`}),
    new Card({type: types.spades, name: 'queen', power: 12, atoutPower: 5, sortIndex: 7 + 27, atoutValue: 3,value: 3, imgSrc: `${imgPath}QS.png`}),
    new Card({type: types.spades, name: 'king', power: 13, atoutPower: 6, sortIndex: 8 + 27, atoutValue: 4,value: 4, imgSrc: `${imgPath}KS.png`}),
    new Card({type: types.spades, name: 'ace', power: 14, atoutPower: 7, sortIndex: 9 + 27, atoutValue: 11,value: 11, imgSrc: `${imgPath}AS.png`}),
];

exports.getCopyCards = function getCopyCards(){
    return JSON.parse(JSON.stringify(cards));
}

exports.getCopyCard = function getCopyCard(type, power){
    const card = cards.find((c)=>c.type == type && c.power == power);
    return JSON.parse(JSON.stringify(card));
}

exports.types = types;