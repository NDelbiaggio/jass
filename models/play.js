const mongoose = require('mongoose');
const Plie = require('./plie');

const nbPlies = 9;
const allCardsBonus = 100;

const playSchema = new mongoose.Schema({
    plies: [Plie],
    atout: String,    
});

playSchema.methods.calculatePlayPoints = function(){
    let points = 0;
    this.plies.forEach(plie => {
        points += plie.calculatePliePoints(this.atout);
    });
    return (this.plies.length == nbPlies)? points + allCardsBonus: points;
};

const Play = mongoose.model('Play', playSchema);

exports.Play = Play;