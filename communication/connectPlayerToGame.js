const {sendCards} = require('./rules/cardsDistribution');
const {getChibrePlayer} = require('./notifiers/notifyToChoseAtout');

const {notifyChibre} = require('./notifiers/notifyChibre');
const {notifyAtout} = require('./notifiers/notifyAtoutChosen');
const {notifyToChooseAtout} = require('./notifiers/notifyToChoseAtout');
const {notifyCurrentPlayerToPlay} = require('./notifiers/notifyPlayerToPlay');

exports.connectPlayerToGame = function connectPlayerToGame(io, socket, game, name){
    let playerEmpty = game.getPlayerEmptySeat();
    playerEmpty.id = socket.id;
    playerEmpty.name = name;
    sendCards(io, socket.id, playerEmpty.cards);
    
    if(!game.play.atout){
        if(game.play.chibre){
            let playerChibre = getChibrePlayer(players, game.play);
            notifyChibre(io, playerChibre.name);
        }else{
            notifyToChooseAtout(io, game.players, game.play);
        }
    }
    else{
        let currentPlie = game.play.getCurrentPlie();
        notifyAtout(socket, game.play.atout);
        socket.emit('plie', {plie: currentPlie});

        notifyCurrentPlayerToPlay(socket, game.play.getCurrentPlie(), game.play, game.players);
    }
}





