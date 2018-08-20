const {sendCards} = require('./rules/cardsDistribution');
const {getChibrePlayer} = require('./notifiers/notifyToChoseTrump');

const {notifyChibre} = require('./notifiers/notifyChibre');
const {notifyTrump} = require('./notifiers/notifyTrumpChosen');
const {notifyToChooseTrump} = require('./notifiers/notifyToChoseTrump');
const {notifyCurrentPlayerToPlay} = require('./notifiers/notifyPlayerToPlay');

exports.connectPlayerToGame = function connectPlayerToGame(io, socket, game, playerEmpty){
    sendCards(io, socket.id, playerEmpty.cards);
    if(game.play.trump == ""){
        if(game.play.chibre){
            let playerChibre = getChibrePlayer(game.players, game.play);
            notifyChibre(io, playerChibre.name);
        }else{
            notifyToChooseTrump(io, game.players, game.play);
        }
    }
    else{
        let currentTrick = game.play.getLastTrick();        
        socket.emit('trick', {trick: currentTrick});
        notifyTrump(socket, game.play.trump);

        notifyCurrentPlayerToPlay(socket, currentTrick, game.play, game.players);
    }
}





