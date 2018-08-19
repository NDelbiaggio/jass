const {notifyAtout} = require('../notifiers/notifyAtoutChosen');
const {notifyPlayerToPlay} = require('../notifiers/notifyPlayerToPlay');
const {getPlayerToChooseAtout, getChibrePlayer} = require('../notifiers/notifyToChoseAtout');
const {notifyActionNotAllowed} =  require('../notifiers/notifyError');
const {notifyChibre} = require('../notifiers/notifyChibre');
const {isAtoutValid} = require('../../db/lstCards');

const atoutEvent = 'atout';

module.exports = function (io, socket, players, play) {
    socket.on(atoutEvent, (atout)=>{
        console.log("Atout is : ",atout)
        if(play.atout){
            return notifyActionNotAllowed(socket, "The play is not finished!");
        }
        if(!atout || !isAtoutValid(atout)){
            return notifyActionNotAllowed(socket, "Atout is not valid");
        }

        const player = getPlayerToChooseAtout(players, play);
        let expectedPlayer = player;

        if(play.chibre){
            expectedPlayer = getChibrePlayer(players, play);
        }
        const playerMatchId = players.find(p => p.socketId == socket.id);
        if(expectedPlayer._id == playerMatchId._id) {
            play.setAtout(atout, player._id);
            notifyAtout(io, play.atout);
            notifyPlayerToPlay(io, player.name);                    
        }else{
            notifyActionNotAllowed(socket, "This is not your turn to choose atout");
        }
    }); 

    socket.on('chibre', ()=>{
        const expectedPlayer = getPlayerToChooseAtout(players, play);
        if(expectedPlayer.socketId == socket.id){
            if(play.atout){
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
            console.log("IT IS NOT YOUR TURN TO CHOOSE ATOUT, SO YOU CAN'T CHIBRE!")
            return notifyActionNotAllowed(socket, "IT IS NOT YOUR TURN TO CHOOSE ATOUT, SO YOU CAN'T CHIBRE!");
        }
    });

}

