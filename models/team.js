const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    players: [],
    points: {
     type: Number,
     default: 0
    }
});

teamSchema.methods.addPlayer = function(player){
    if(this.players.length == 2) throw new Error('Team full');
    this.players.push(player);
}

exports.teamSchema = teamSchema;