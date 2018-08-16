const mongoose = require('mongoose');
const {teamSchema, Team} = require('./team');
const {playSchema, Play} = require('./play');
const {playerSchema, Player} = require('./player');

const limitPlayers = 4;

const gameSchema = new mongoose.Schema({
    players: {
        type: [playerSchema],
        default: [
            new Player(),
            new Player(),
            new Player(),
            new Player()
        ]
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

gameSchema.statics.createGame = function(){
    let game = new Game();
    game.teamA.players = [
        game.players[0],
        game.players[2],
    ];
    game.teamB.players = [
        game.players[1],
        game.players[3],
    ];
    return game;
};

/**
 * Set the player socket id and the player name to an available player
 * @param {string} playerScoketId
 * @param {string} playerName
 * @returns {Player} return the player set. Return null if no player was available
 */
gameSchema.methods.setNewPlayer = function (playerSocketId, playerName){
    let player = this.players.find(player => player.id == "");
    if(player){
        player.id = playerSocketId;
        player.name = playerName;
        return player;
    }
    return;
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
    let res = this.players.find(player => player.id == "");
    return (res)? true: false;
}

/**
 * Return an empty player. Empty player means that no real player are connected, but it still contains the cards of the previous player
 * @returns {Player} return empty player.
 */
gameSchema.methods.getPlayerEmptySeat = function(){
    console.log(this.players);
    return this.players.find(player => player.id == "");
}

/**
 * Returns the number of player in the game
 * @returns {number} return the number of player in players. However, it doesn't mean that all the players have a socket id.
 */
// gameSchema.methods.getNumberOfPlayers = function(){
//     return this.players.length;
// }

/**
 * Returns the number of connected players
 * @returns {number} the number of connected players
 */
gameSchema.methods.getNumberOfPlayersConnected = function(){
    let nbPlayer = 0;
    for (let i = 0; i < this.players.length; i++) {
        if(this.players[i].id){
            nbPlayer++;
        }        
    }
    return nbPlayer;
}

gameSchema.methods.playersHaveCards = function(){
    return this.players.some(player => {
        return player.cards.length > 0;
    });
}

const Game = mongoose.model('Game', gameSchema);

exports.Game = Game;