// const mongoose = require('mongoose');
//  const {actionSchema, Action} = require('./action');

// const nbPlies = 9;
// const bonusLast = 5;

// const plieSchema = new mongoose.Schema({
//     number: {
//         type: Number,
//         default: 1
//     },
//     actions: {
//         type: [actionSchema],
//         default: []
//     },
//     highestCardIndex: {
//         type: Number,
//         default: 0
//     },
//     leadingPlayer: String,
//     lastPlayer: String
// });

// plieSchema.methods.calculatePliePoints = function(atout){
//     let points = 0;
//     let cards = getCardsFromActions(this.actions);
//     console.log(cards)
//     cards.forEach(c => {
//         console.log('points: ', points)
//         console.log('card: ', c)
//         points += (c.type == atout)? c.atoutValue: c.value
//     });
//     return (this.number == nbPlies)? points+bonusLast: points;
// };

// plieSchema.methods.addCardPlayed = function(atout, card, playerName, playerId){
//     this.actions.push(new Action({card, playerName}));
//     this.lastPlayer = playerId;
//     let cards = getCardsFromActions(this.actions);
//     console.log(cards)
//     console.log(this.getLeadingCard());
//     let isHigher = isCardHigher(atout, card, this.getLeadingCard());
//     console.log(isHigher)
//     console.log(cards.length)
//     if(cards.length == 1){
//         isHigher = true;
//     }
//     if(isHigher){
//         this.highestCardIndex = cards.length - 1;
//         this.leadingPlayer = playerId;
//     }
//     console.log(this.highestCardIndex)
//     console.log(this.highestCardIndex)
//     console.log(this.highestCardIndex)
//     console.log(this.highestCardIndex)
//     console.log(this.highestCardIndex)
//     console.log(this.highestCardIndex)
//     return cards.length;
// }

// plieSchema.methods.getFirstCard = function getFirstCard(){
//     return this.actions[0].card;
// }

// plieSchema.methods.getLeadingCard = function getLeadingCard(){
//     return this.actions[this.highestCardIndex].card;
// }

// plieSchema.methods.getCards = function getCards(){
//     return getCardsFromActions(this.actions);
// }

// plieSchema.methods.isEmpty = function isEmpty (){
//     return this.actions.length == 0;
// }

// function getCardsFromActions (actions){
//     let cards = [];
//     actions.forEach(action =>{
//         cards.push(action.card);
//     });
//     return cards;
// }

// function isCardHigher(atout, card, leadingCard){
//     if(card.type == atout && leadingCard.type != atout) return true;
//     if(card.type != atout && leadingCard.type == atout) return false;
//     if(card.type != atout && leadingCard.type != atout){
//         if(card.type != leadingCard.type) return false;
//         return card.power > leadingCard.power
//     }else{
//         return card.atoutPower > leadingCard.atoutPower
//     }
// }




// const Plie = mongoose.model('Plie', plieSchema);

// exports.Plie = Plie;
// exports.plieSchema = plieSchema;


const {Action} = require('./action');

const nbPlies = 9;
const bonusLast = 5;

exports.Plie = class Plie {

    constructor(number = 1, atout, actions = [], highestCardIndex = 0 , leadingPlayer = '', lastPlayer = ''){
        this.number = number;
        this.atout = atout
        this.actions = actions;
        this.highestCardIndex = highestCardIndex;
        this.leadingPlayer = leadingPlayer;
        this.lastPlayer = lastPlayer;
    }

    /**
     * Calculates the points of the plie
     * @returns {number} the points of the plie
     */
    calculatePliePoints(){
        let points = 0;
        let cards = this.getCards(this.actions);
        cards.forEach(c => {
            points += (c.type == this.atout)? c.atoutValue: c.value
        });
        return (this.number == nbPlies)? points+bonusLast: points;
    };
    
    /**
     * Add an action to actions and set the highest card in the plie
     * @param {*} card 
     * @param {*} playerName 
     * @param {*} playerId 
     */
    addCardPlayed( card, playerName, playerId){
        this.actions.push(new Action(playerName, card));
        this.lastPlayer = playerId;
        let cards = this.getCards();
        let isHigher;
        if(cards.length <= 1){
            isHigher = true;
        }else{
            isHigher = this.isCardHigher(card, this.getLeadingCard());
        }
        if(isHigher){
            this.highestCardIndex = cards.length - 1;
            this.leadingPlayer = playerId;
        }
        return cards.length;
    }
    
    /**
     * Returns the first card of the plie
     * @returns {Card} the first card of the plie
     */
    getFirstCard(){
        return this.actions[0].card;
    }
    
    /**
     * Returns the leading card
     * @returns {Card} leading card of the plie
     */
    getLeadingCard(){
        return this.actions[this.highestCardIndex].card;
    }    
    
    /**
     * Returns true if there is no cards in the plie
     * @returns {boolean} returns true if the plie is empty
     */
    isEmpty (){
        return this.actions.length == 0;
    }
    
    /**
     * Returns the cards of the plie 
     * @returns {[cards]} returns cards of the plie
     */
    getCards (){
        let cards = [];
        this.actions.forEach(action =>{
            cards.push(action.card);
        });
        return cards;
    }
    
    /**
     * Returns true if the given card is better than the leading card
     * @param {*} card 
     * @param {*} leadingCard 
     * @returns {boolean} returns true if the given card is stronger than the leading card
     */
    isCardHigher(card, leadingCard){
        if(card.type == this.atout && leadingCard.type != this.atout) return true;
        if(card.type != this.atout && leadingCard.type == this.atout) return false;
        if(card.type != this.atout && leadingCard.type != this.atout){
            if(card.type != leadingCard.type) return false;
            return card.power > leadingCard.power
        }else{
            return card.atoutPower > leadingCard.atoutPower
        }
    }
}