const {sendCards} = require('./rules/cardsDistribution');
const {getChibrePlayer} = require('./notifiers/notifyToChoseAtout');

const {notifyChibre} = require('./notifiers/notifyChibre');
const {notifyAtout} = require('./notifiers/notifyAtoutChosen');
const {notifyToChooseAtout} = require('./notifiers/notifyToChoseAtout');
const {notifyCurrentPlayerToPlay} = require('./notifiers/notifyPlayerToPlay');

exports.connectPlayerToGame = function connectPlayerToGame(io, socket, game, playerEmpty){

    sendCards(io, socket.id, playerEmpty.cards);
    console.log(game.play.isAtoutSet())
    if(game.play.atout == ""){
        console.log("Atout not set")
        if(game.play.chibre){
            let playerChibre = getChibrePlayer(game.players, game.play);
            notifyChibre(io, playerChibre.name);
        }else{
            notifyToChooseAtout(io, game.players, game.play);
        }
    }
    else{
        let currentPlie = game.play.getLastPlie();        
        socket.emit('plie', {plie: currentPlie});
        notifyAtout(socket, game.play.atout);

        notifyCurrentPlayerToPlay(socket, currentPlie, game.play, game.players);
    }
}





