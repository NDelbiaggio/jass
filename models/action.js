// const mongoose = require('mongoose');
// const {cardSchema} = require('./card');

// const actionSchema = new mongoose.Schema({
//     playerName: {
//         type: String
//     },
//     card: {
//         type: [cardSchema]
//     }
// });

// const Action = mongoose.model('Action', actionSchema);

// exports.Action = Action;
// exports.actionSchema = actionSchema;


exports.Action = class Action{

    constructor(playerName, card){
        this.playerName = playerName;
        this.card = card;
    }

    // get playerName(){
    //     return this.playerName;
    // }

    // get card(){
    //     return this.card;
    // }
    
    // set playerName(playerName){
    //     this.playerName = playerName;
    // }

    // set card(card){
    //     this.card = card;
    // }
}