
const chibreEvent = 'chibre';

function notifyChibre(io, playerName){
    io.emit(chibreEvent, {player: playerName});
}

exports.notifyChibre = notifyChibre;