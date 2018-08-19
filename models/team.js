// const mongoose = require('mongoose');

// const teamSchema = new mongoose.Schema({
//     players: {
//         type: [],
//         default: []
//     },
//     points: {
//      type: Number,
//      default: 0
//     }
// });


// /**
//  * Add the player to the list of players, throw an exception if the team is full
//  * @param {Object} player 
//  */
// teamSchema.methods.addPlayer = function(player){
//     if(this.players.length == 2) throw new Error('Team full');
//     this.players.push(player);
// }

// /**
//  * Remove the player to the players list 
//  * @param {Object} player 
//  * @returns {boolean} boolean return true if the player has been removed, otherwise false
//  */
// teamSchema.methods.removePlayer = function(player){
//     const p = this.players.find(p=>p.id == player.id);
//     const ind = this.players.indexOf(p);
//     if(ind != -1){
//         this.players.splice(ind, 1);
//         return true;
//     }
//     return false;
// }

// teamSchema.methods.increasePoints = function(points){
//     this.points += points;
// }

// const Team = mongoose.model('Team', teamSchema);

// exports.teamSchema = teamSchema;
// exports.Team = Team;


exports.Team = class Team{

    constructor(players = []){
        this.players = players;
        this.points = 0;
    }

        
    /**
     * Add the player to the list of players, throw an exception if the team is full
     * @param {Object} player 
     */
    addPlayer(player){
        if(this.players.length == 2) throw new Error('Team full');
        this.players.push(player);
    }

    addPlayers(players){
        this.players = players;
    }

    /**
     * Remove the player to the players list 
     * @param {Object} player 
     * @returns {boolean} boolean return true if the player has been removed, otherwise false
     */
    removePlayer(player){
        const p = this.players.find(p=>p.id == player.id);
        const ind = this.players.indexOf(p);
        if(ind != -1){
            this.players.splice(ind, 1);
            return true;
        }
        return false;
    }

    increasePoints(points){
        this.points += points;
    }

    getPlayers(){
        return this.players;
    }


}