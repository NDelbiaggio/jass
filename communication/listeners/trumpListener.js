const {notifyTrump} = require('../notifiers/notifyTrumpChosen');
const {notifyPlayerToPlay} = require('../notifiers/notifyPlayerToPlay');
const {getPlayerToChooseTrump, getChibrePlayer} = require('../notifiers/notifyToChoseTrump');
const {notifyActionNotAllowed} =  require('../notifiers/notifyError');
const {notifyChibre} = require('../notifiers/notifyChibre');
const {isTrumpValid} = require('../../db/deck');

const trumpEvent = 'trump';

module.exports = function (io, socket, players, play) {
    socket.on(trumpEvent, (trump)=>{
        if(play.trump){
            return notifyActionNotAllowed(socket, "The play is not finished!");
        }
        if(!trump || !isTrumpValid(trump)){
            return notifyActionNotAllowed(socket, "Trump is not valid");
        }

        const player = getPlayerToChooseTrump(players, play);
        let expectedPlayer = player;

        if(play.chibre){
            expectedPlayer = getChibrePlayer(players, play);
        }
        const playerMatchId = players.find(p => p.socketId == socket.id);
        if(expectedPlayer._id == playerMatchId._id) {
            play.setTrump(trump, player._id);
            notifyTrump(io, play.trump);
            notifyPlayerToPlay(io, player.name);                    
        }else{
            notifyActionNotAllowed(socket, "This is not your turn to choose trump");
        }
    }); 

    socket.on('chibre', ()=>{
        const expectedPlayer = getPlayerToChooseTrump(players, play);
        if(expectedPlayer.socketId == socket.id){
            if(play.trump){
                return notifyActionNotAllowed(socket, "The play is not finished!");
            }
            if(!play.chibre){
                play.chibre = socket.id;
        
                //get player who has to choose
                const player = getChibrePlayer(players, play);
        
                //contact the player who has to choose
                notifyChibre(io, player.name);
            }else{
                return notifyActionNotAllowed(socket, "You have already chibre.");
            }
        }else{
            console.log("IT IS NOT YOUR TURN TO CHOOSE TRUMP, SO YOU CAN'T CHIBRE!")
            return notifyActionNotAllowed(socket, "IT IS NOT YOUR TURN TO CHOOSE TRUMP, SO YOU CAN'T CHIBRE!");
        }
    });

}

