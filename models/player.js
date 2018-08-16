const mongoose = require('mongoose');
const {cardSchema} = require('./card');

const playerSchema = new mongoose.Schema({
    id: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        default: ""
    },
    cards: {
        type: [cardSchema],
        default: []    
    }
});

const Player = mongoose.model('Player', playerSchema);


/**
 * Set the player hand cards
 * @param {[Object]} cards 
 */
playerSchema.methods.setHand = function(cards){
    this.cards = cards;
}


/**
 * Returns the cards in the hand of the player
 * @returns {[Object] cards}
 */
playerSchema.methods.getHand = function(){return this.cards;}

/**
 * Push the received card to the cards array
 * @param {Object} card 
 */
playerSchema.methods.addCardToHand = function(card){
    this.cards.push(card);
}

/**
 * Removes the card with the according id and returns the card
 * @param {String} cardId 
 * @returns {Object} card the card that has been removed
 */
playerSchema.methods.playCard = function(cardId){
   const card = this.cards.find(card=> card.id == cardId);
   const indCard = this.cards.findIndex(c => c._id == cardId);
   this.cards.splice(indCard, 1);
   
    return card;
}


exports.Player = Player;
exports.playerSchema = playerSchema;