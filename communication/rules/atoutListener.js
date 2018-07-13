const {Play} = require('../../models/play');
const {getCurrentHands} = require('../../db/hands');

exports.atoutListener = function(io, socket, cb){
    socket.on('atout', (payload)=>{
        let play = new Play({
            atout: payload.atout
        });
    
        let hands = getCurrentHands();
        io.emit('atout chosen', {
            atout: play.atout
        });
        
        cb(play, hands)
    });
}


