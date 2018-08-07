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
    }

});

gameSchema.methods.addNewPlayer = function (player, team){
    this.players.push(player);
    (team==0)? this.teamA.addPlayer(player): this.teamB.addPlayer(player);
};

const Game = mongoose.model('Game', gameSchema);

exports.Game = Game;