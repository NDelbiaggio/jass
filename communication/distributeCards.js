module.exports.distributeCards = function distributeCards(players, server){
    var io = require('socket.io')(server);

    players.forEach((p)=>{
        const hand = getHand();
        io.to(p.id).emit('game start', {
            cards: hand
        });
    });
}

function getHand(){



    return [
        `card ${Math.floor((Math.random()*10) + 1)}`,
        `card ${Math.floor((Math.random()*10) + 1)}`,
        `card ${Math.floor((Math.random()*10) + 1)}`,
        `card ${Math.floor((Math.random()*10) + 1)}`,
    ]
}