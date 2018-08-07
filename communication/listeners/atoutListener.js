const { Plie } = require('../../models/plie');
const {Play} = require('../../models/play');

const notifyAtoutChosen = require('../notifiers/notifyAtoutChosen');
const {notifyPlayerToPlay} = require('../notifiers/notifyPlayerToPlay');

module.exports = function (io, socket, play) {

    socket.on('atout', (payload)=>{
        play.atout = payload.atout; 
        play.atoutChosenBy = socket.id
        notifyAtoutChosen(io, play.atout);
        notifyPlayerToPlay(io, play.atoutChosenBy);                    
    }); 

}

