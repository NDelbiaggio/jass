const mongoose = require('mongoose');
const {teamSchema, Team} = require('./team');
const {playSchema, Play} = require('./play');
const {playerSchema} = require('./player');

const limitPlayers = 4;

const gameSchema = new mongoose.Schema({
    players: {
        type: [playerSchema],
        default: []
    },
    teamA: {
        type: teamSchema,
        default: new Team()
    },
    teamB: {
        type: teamSchema,
        default: new Team()
    },
    play: {
        type: playSchema,
        default: new Play()
    },
    status: {
        type: Number,
        default: 0
    }

});

let teamA = true;
gameSchema.methods.addNewPlayer = function (player){
    this.players.push(player);
    (teamA)? this.teamA.addPlayer(player): this.teamB.addPlayer(player);
    teamA = !teamA; 
};

/**
 * Get the player that has the given object _id
 * @param {*} player_id 
 * @returns {Player} return the player that has the same given object _id
 */
gameSchema.methods.getPlayerFrom_id = function(player_id){
    return this.players.find(player => player._id == player_id);
}

/**
 * Returns the player with the player id received.
 * @param {*} playerId is the socket id related to the player
 * @returns {Player} player with the given id
 */
gameSchema.methods.getPlayerFromId = function(playerId){
    return this.players.find(player => player.id == playerId);
}

/**
 * Get if there is an empty place in the game
 * @returns {boolean} return true if there is an empty place in players
 */
gameSchema.methods.isPlaceAvailable = function(){
    if(this.players.length < limitPlayers ) return true;
    let res = this.players.find(player => player.id == "");
    return (res)? true: false;
}

/**
 * Return an empty player. Empty player means that no real player are connected, but it still contains the cards of the previous player
 * @returns {Player} return empty player.
 */
gameSchema.methods.getPlayerEmptySeat = function(){
    return this.players.find(player => player.id == "");
}

/**
 * Returns the number of player in the game
 * @returns {number} return the number of player in players. However, it doesn't mean that all the players have a socket id.
 */
gameSchema.methods.getNumberOfPlayers = function(){
    return this.players.length;
}

gameSchema.methods.getNumberOfPlayersConnected = function(){
    let nbPlayer = 0;
    for (let i = 0; i < this.players.length; i++) {
        if(this.players[i].id){
            nbPlayer++;
        }        
    }
    return nbPlayer;
}

const Game = mongoose.model('Game', gameSchema);

exports.Game = Game;