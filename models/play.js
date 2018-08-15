const mongoose = require('mongoose');
const {plieSchema, Plie} = require('./plie');

const nbPlies = 9;
const allCardsBonus = 100;

const playSchema = new mongoose.Schema({
    plies: {
        type: [plieSchema],
        default: []
    },
    atout: String,    
    atoutChosenBy: String,
    chibre: String
});

/**
 * Returns the points of the play
 * @param {[Object]} plies
 * @returns {number} points
 */
playSchema.methods.calculatePlayPoints = function(plies=this.plies){
    let points = 0;
    plies.forEach(plie => {
        points += plie.calculatePliePoints(this.atout);
    });
    
    return (plies.length == nbPlies)? points + allCardsBonus: points;
};

/**
 * Returns the number of points made by the received team
 * @param {Object} team 
 * @returns {number} points
 */
playSchema.methods.calculatePointsTeam = function(team){
    let plieTeam = [];
    this.plies.forEach(plie =>{
       let indPlayer = team.players.findIndex(p => p._id == plie.leadingPlayer); 
        if(indPlayer != -1){
            plieTeam.push(plie);
        } 
    });

    return this.calculatePlayPoints(plieTeam);
}

/**
 * Add a plie to the plies
 * @param {Object} plie 
 */
playSchema.methods.addPlie = function(plie){
    plies.push(plie);
};

/**
 * Create a new plie with the number following the previous ones
 * @returns {Object} plie
 */
playSchema.methods.createNewPlie = function(){
    if(this.plies.length == 9) return;
    const plieNumber = this.plies.length == 0? 1: this.plies[this.plies.length-1].number + 1;
    let plie = new Plie({number: plieNumber});
    this.plies.push(plie);
    return plie;
}

/**
 * Returns the last plie
 * @returns {Object} plie
 */
playSchema.methods.getCurrentPlie = function(){
    if(this.plies.length == 0) return this.createNewPlie();
    return this.plies[this.plies.length-1];
}

/**
 * Returns the previous plie, if there is only one plie the first one is returned
 * @returns {Object} plie
 */
playSchema.methods.getPreviousPlie = function(){
    const prevPlieInd = this.plies.length <= 1? 0: this.plies.length -2;
    return this.plies[prevPlieInd];
}

playSchema.methods.clearPlies = function(){
    this.plies = [];
    this.chibre = "";
    this.atout = "";
}

const Play = mongoose.model('Play', playSchema);

exports.Play = Play;
exports.playSchema = playSchema;