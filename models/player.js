// const mongoose = require('mongoose');
// const {cardSchema} = require('./card');

// const playerSchema = new mongoose.Schema({
//     id: {
//         type: String,
//         default: ""
//     },
//     name: {
//         type: String,
//         default: ""
//     },
//     cards: {
//         type: [cardSchema],
//         default: []    
//     }
// });

// const Player = mongoose.model('Player', playerSchema);


// /**
//  * Set the player hand cards
//  * @param {[Object]} cards 
//  */
// playerSchema.methods.setHand = function(cards){
//     this.cards = cards;
// }


// /**
//  * Returns the cards in the hand of the player
//  * @returns {[Object] cards}
//  */
// playerSchema.methods.getHand = function(){return this.cards;}

// /**
//  * Push the received card to the cards array
//  * @param {Object} card 
//  */
// playerSchema.methods.addCardToHand = function(card){
//     this.cards.push(card);
// }

// /**
//  * Removes the card with the according id and returns the card
//  * @param {String} cardId 
//  * @returns {Object} card the card that has been removed
//  */
// playerSchema.methods.playCard = function(cardId){
//    const card = this.cards.find(card=> card.id == cardId);
//    const indCard = this.cards.findIndex(c => c._id == cardId);
//    this.cards.splice(indCard, 1);
   
//     return card;
// }


// exports.Player = Player;
// exports.playerSchema = playerSchema;

const mongoose = require('mongoose');

exports.Player = class Player{
    constructor(socketId = '', name = '', cards = []){
        this._id = mongoose.Types.ObjectId();
        this.socketId = socketId;
        this.name = name;
        this.cards = cards;
    }

    getPlayerId(){
        return this._id;
    }

    /**
     * Set the player hand cards
     * @param {[Object]} cards 
     */
    setHand(cards){
        this.cards = cards;
    }

    /**
     * Returns the cards in the hand of the player
     * @returns {[Object] cards}
     */
    getHand(){
        return this.cards;
    }

    /**
     * Push the received card to the cards array
     * @param {Object} card 
     */
    addCardToHand(card){
        this.cards.push(card);
    }

    /**
     * Removes the card with the according id and returns the card
     * @param {String} cardId 
     * @returns {Object} card the card that has been removed
     */
    playCard(cardId){
        const indCard = this.cards.findIndex(c => c.id == cardId);
        
        if(indCard != -1){
            this.cards.splice(indCard, 1);
            return true;
        }
        return false;
    }

    /**
     * Set the name and the socket id of a player
     * @param {*} socketId 
     * @param {*} name 
     */
    setPlayerInformation(socketId, name){
        this.socketId = socketId;
        this.name = name;
    }
}