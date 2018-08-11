const mongoose = require('mongoose');
const {teamSchema, Team} = require('./team');
const {playSchema, Play} = require('./play');
const {playerSchema} = require('./player');

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

const Game = mongoose.model('Game', gameSchema);

exports.Game = Game;