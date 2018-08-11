const mongoose = require('mongoose');
const {cardSchema} = require('./card');





const announceSchema = new mongoose.Schema({
    power: number,
    points: number
});

const Announce = mongoose.model('Announce', plieSchema);

exports.Announce = Announce;