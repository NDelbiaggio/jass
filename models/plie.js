const mongoose = require('mongoose');
const {cardSchema} = require('./card');

const nbPlies = 9;
const bonusLast = 5;

const plieSchema = new mongoose.Schema({
    number: Number,
    cards: [cardSchema],
    highestCardIndex: {
        type: Number,
        default: 0
    },
    leadingPlayer: String //will be change into a player object
});

plieSchema.methods.calculatePliePoints = function(atout){
    let points = 0;    
    this.cards.forEach(c => {
        points += (c.type == atout)? c.atoutValue: c.value
    });
    return (this.number == nbPlies)? points+bonusLast: points;
};

plieSchema.methods.addCardPlayed = function(atout, card){
    this.cards.push(card);
    //update highestCardIndex
}

const Plie = mongoose.model('Plie', plieSchema);

exports.Plie = Plie;