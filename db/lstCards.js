const { Card } = require('../models/card');

const types = {
    diamonds: 'diamonds',
    spades: 'spades',
    hearts: 'hearts',
    clubs: 'clubs'
};

exports.isAtoutValid = function (atout) {
    if (atout == types.diamonds || atout == types.spades || atout == types.hearts || atout == types.clubs) return true;
    return false;
}

const imgPath = "https://deckofcardsapi.com/static/img/"

const cards = [
    new Card(types.diamonds, 'six', 6, 1, 1, 0, 0, `${imgPath}6D.png`),
    new Card(types.diamonds, 'seven', 7, 2, 2, 0, 0, `${imgPath}7D.png`),
    new Card(types.diamonds, 'eight', 8, 3, 3, 0, 0, `${imgPath}8D.png`),
    new Card(types.diamonds, 'nine', 9, 8, 4, 14, 0, `${imgPath}9D.png`),
    new Card(types.diamonds, 'ten', 10, 4, 5, 10, 10, `${imgPath}0D.png`),
    new Card(types.diamonds, 'valet', 11, 9, 6, 20, 2, `${imgPath}JD.png`),
    new Card(types.diamonds, 'queen', 12, 5, 7, 3, 3, `${imgPath}QD.png`),
    new Card(types.diamonds, 'king', 13, 6, 8, 4, 4, `${imgPath}KD.png`),
    new Card(types.diamonds, 'ace', 14, 7, 9, 11, 11, `${imgPath}AD.png`),

    new Card(types.clubs, 'six', 6, 1, 1 + 9, 0, 0, `${imgPath}6C.png`),
    new Card(types.clubs, 'seven', 7, 2, 2 + 9, 0, 0, `${imgPath}7C.png`),
    new Card(types.clubs, 'eight', 8, 3, 3 + 9, 0, 0, `${imgPath}8C.png`),
    new Card(types.clubs, 'nine', 9, 8, 4 + 9, 14, 0, `${imgPath}9C.png`),
    new Card(types.clubs, 'ten', 10, 4, 5 + 9, 10, 10, `${imgPath}0C.png`),
    new Card(types.clubs, 'valet', 11, 9, 6 + 9, 20, 2, `${imgPath}JC.png`),
    new Card(types.clubs, 'queen', 12, 5, 7 + 9, 3, 3, `${imgPath}QC.png`),
    new Card(types.clubs, 'king', 13, 6, 8 + 9, 4, 4, `${imgPath}KC.png`),
    new Card(types.clubs, 'ace', 14, 7, 9 + 9, 11, 11, `${imgPath}AC.png`),

    new Card(types.hearts, 'six', 6, 1, 1 + 18, 0, 0, `${imgPath}6H.png`),
    new Card(types.hearts, 'seven', 7, 2, 2 + 18, 0, 0, `${imgPath}7H.png`),
    new Card(types.hearts, 'eight', 8, 3, 3 + 18, 0, 0, `${imgPath}8H.png`),
    new Card(types.hearts, 'nine', 9, 8, 4 + 18, 14, 0, `${imgPath}9H.png`),
    new Card(types.hearts, 'ten', 10, 4, 5 + 18, 10, 10, `${imgPath}0H.png`),
    new Card(types.hearts, 'valet', 11, 9, 6 + 18, 20, 2, `${imgPath}JH.png`),
    new Card(types.hearts, 'queen', 12, 5, 7 + 18, 3, 3, `${imgPath}QH.png`),
    new Card(types.hearts, 'king', 13, 6, 8 + 18, 4, 4, `${imgPath}KH.png`),
    new Card(types.hearts, 'ace', 14, 7, 9 + 18, 11, 11, `${imgPath}AH.png`),

    new Card(types.spades, 'six', 6, 1, 1 + 27, 0, 0, `${imgPath}6S.png`),
    new Card(types.spades, 'seven', 7, 2, 2 + 27, 0, 0, `${imgPath}7S.png`),
    new Card(types.spades, 'eight', 8, 3, 3 + 27, 0, 0, `${imgPath}8S.png`),
    new Card(types.spades, 'nine', 9, 8, 4 + 27, 14, 0, `${imgPath}9S.png`),
    new Card(types.spades, 'ten', 10, 4, 5 + 27, 10, 10, `${imgPath}0S.png`),
    new Card(types.spades, 'valet', 11, 9, 6 + 27, 20, 2, `${imgPath}JS.png`),
    new Card(types.spades, 'queen', 12, 5, 7 + 27, 3, 3, `${imgPath}QS.png`),
    new Card(types.spades, 'king', 13, 6, 8 + 27, 4, 4, `${imgPath}KS.png`),
    new Card(types.spades, 'ace', 14, 7, 9 + 27, 11, 11, `${imgPath}AS.png`),
];

exports.getCopyCards = function getCopyCards() {
    return JSON.parse(JSON.stringify(cards));
}

exports.getCopyCard = function getCopyCard(type, power) {
    const card = cards.find((c) => c.type == type && c.power == power);
    return JSON.parse(JSON.stringify(card));
}

exports.types = types;