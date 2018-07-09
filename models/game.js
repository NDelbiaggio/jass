const mongoose = require('mongoose');
const {teamSchema} = require('./team');

const gameSchema = new mongoose.Schema({
    players: Object,
    teamA: teamSchema,
    teamB: teamSchema
});

const Game = mongoose.model('Game', gameSchema);

exports.Game = Game;