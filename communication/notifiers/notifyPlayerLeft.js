
const eventName = 'player left'

function notifyPlayerLeft(io, playerName){
    io.emit(eventName, playerName);
}

exports.notifyPlayerLeft = notifyPlayerLeft;