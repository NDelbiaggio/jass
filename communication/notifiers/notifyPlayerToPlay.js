
const eventName = 'your turn';

function notifyPlayerToPlay(io, playerId){
    io.to(playerId).emit(eventName);
}

function notifyNextPlayerToPlay (io, players, currentPlayerInd){
    const next = currentPlayerInd == players.length -1? 0: currentPlayerInd + 1;
    notifyPlayerToPlay(io, players[next].id);
    return next;
}

exports.notifyPlayerToPlay = notifyPlayerToPlay;
exports.notifyNextPlayerToPlay = notifyNextPlayerToPlay;