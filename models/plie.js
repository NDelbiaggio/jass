const mongoose = require('mongoose');
const {cardSchema} = require('./card');

const nbPlies = 9;
const bonusLast = 5;

const plieSchema = new mongoose.Schema({
    number: {
        type: Number,
        default: 0
    },
    cards: {
        type: [cardSchema],
        default: []
    },
    highestCardIndex: {
        type: Number,
        default: 0
    },
    leadingPlayer: String 
});

plieSchema.methods.calculatePliePoints = function(atout){
    let points = 0;    
    this.cards.forEach(c => {
        points += (c.type == atout)? c.atoutValue: c.value
    });
    return (this.number == nbPlies)? points+bonusLast: points;
};

plieSchema.methods.addCardPlayed = function(atout, card, playerId){
    this.cards.push(card);
    const isHigher = isCardHigher(atout, card, this.cards[this.highestCardIndex]);
    if(isHigher){
        this.highestCardIndex = this.cards.length - 1;
        this.leadingPlayer = playerId;
    }
    return this.cards.length;
}

function isCardHigher(atout, card, leadingCard){
    if(card.type == atout && leadingCard.type != atout) return true;
    if(card.type != atout && leadingCard.type == atout) return false;
    if(card.type != atout && leadingCard.type != atout){
        return card.power > leadingCard.power
    }else{
        return card.atoutPower > leadingCard.atoutPower
    }
}

const Plie = mongoose.model('Plie', plieSchema);

exports.Plie = Plie;
exports.plieSchema = plieSchema;