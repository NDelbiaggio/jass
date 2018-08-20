const {Action} = require('./action');

const nbTricks = 9;
const bonusLast = 5;

exports.Trick = class Trick {

    constructor(number = 1, trump, actions = [], highestCardIndex = 0 , leadingPlayer = '', lastPlayer = ''){
        this.number = number;
        this.trump = trump
        this.actions = actions;
        this.highestCardIndex = highestCardIndex;
        this.leadingPlayer = leadingPlayer;
        this.lastPlayer = lastPlayer;
    }

    /**
     * Calculates the points of the trick
     * @returns {number} the points of the trick
     */
    calculateTrickPoints(){
        let points = 0;
        let cards = this.getCards(this.actions);
        cards.forEach(c => {
            points += (c.type == this.trump)? c.trumpValue: c.value
        });
        return (this.number == nbTricks)? points + bonusLast: points;
    };
    
    /**
     * Add an action to actions and set the highest card in the trick
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
     * Returns the first card of the trick
     * @returns {Card} the first card of the trick
     */
    getFirstCard(){
        return this.actions[0].card;
    }
    
    /**
     * Returns the leading card
     * @returns {Card} leading card of the trick
     */
    getLeadingCard(){
        return this.actions[this.highestCardIndex].card;
    }    
    
    /**
     * Returns true if there is no cards in the trick
     * @returns {boolean} returns true if the trick is empty
     */
    isEmpty (){
        return this.actions.length == 0;
    }
    
    /**
     * Returns the cards of the trick 
     * @returns {[cards]} returns cards of the trick
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
        if(card.type == this.trump && leadingCard.type != this.trump) return true;
        if(card.type != this.trump && leadingCard.type == this.trump) return false;
        if(card.type != this.trump && leadingCard.type != this.trump){
            if(card.type != leadingCard.type) return false;
            return card.power > leadingCard.power
        }else{
            return card.trumpPower > leadingCard.trumpPower
        }
    }
}