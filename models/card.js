const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    type: String,
    name: String,
    power: Number,
    atoutPower: Number,
    sortIndex: Number,
    atoutValue: Number,
    value: Number,
    imgSrc: String
});

const Card = mongoose.model('Card', cardSchema);

exports.Card = Card;
exports.cardSchema = cardSchema;

/** Cards Sort Index
 *  LEFT - DIAMONDS 6 -> ace
 *         CLUBS    6 -> ace
 *         HEARTS   6 -> ace
 *  RIGHT  SPADES   6 -> ace
 */