const mongoose = require('mongoose');
const {teamSchema, Team} = require('./team');

const gameSchema = new mongoose.Schema({
    players: {
        type: [],
        default: []
    },
    teamA: {
        type: teamSchema,
        default: new Team()
    },
    teamB: {
        type: teamSchema,
        default: new Team()
    }
});

gameSchema.methods.addNewPlayer = function (player, team){
    this.players.push(player);
    (team==0)? this.teamA.addPlayer(player): this.teamB.addPlayer(player);
};

const Game = mongoose.model('Game', gameSchema);

exports.Game = Game;