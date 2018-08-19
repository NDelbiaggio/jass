// const mongoose = require('mongoose');

// const cardSchema = new mongoose.Schema({
//     type: String,
//     name: String,
//     power: Number,
//     atoutPower: Number,
//     sortIndex: Number,
//     atoutValue: Number,
//     value: Number,
//     imgSrc: String
// });

// const Card = mongoose.model('Card', cardSchema);

// exports.Card = Card;
// exports.cardSchema = cardSchema;

/** Cards Sort Index
 *  LEFT - DIAMONDS 6 -> ace
 *         CLUBS    6 -> ace
 *         HEARTS   6 -> ace
 *  RIGHT  SPADES   6 -> ace
 */

 const mongoose = require('mongoose');

 exports.Card = class Card{
     constructor(type, name, power, atoutPower, sortIndex, atoutValue, value, imgSrc){
        this.id = mongoose.Types.ObjectId();
        this.type = type;
        this.name = name;
        this.power = power;
        this.atoutPower = atoutPower;
        this.sortIndex = sortIndex;
        this.atoutValue = atoutValue;
        this.value = value;
        this.imgSrc = imgSrc;
     }
 }
 