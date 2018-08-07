const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    players: {
        type: [],
        default: []
    },
    points: {
     type: Number,
     default: 0
    }
});


/**
 * Add the player to the list of players, throw an exception if the team is full
 * @param {Object} player 
 */
teamSchema.methods.addPlayer = function(player){
    if(this.players.length == 2) throw new Error('Team full');
    this.players.push(player);
}

/**
 * Remove the player to the players list 
 * @param {Object} player 
 * @returns {boolean} boolean return true if the player has been removed, otherwise false
 */
teamSchema.methods.removePlayer = function(player){
    const p = this.players.find(p=>p.id == player.id);
    const ind = this.players.indexOf(p);
    if(ind != -1){
        this.players.splice(ind, 1);
        return true;
    }
    return false;
}

const Team = mongoose.model('Team', teamSchema);

exports.teamSchema = teamSchema;
exports.Team = Team;