

const eventName = 'card played';

function notifyCardPlayed(io, card, playerName){
    io.emit(eventName, {
        card,
        player: playerName
    });
}

exports.notifyCardPlayed = notifyCardPlayed;