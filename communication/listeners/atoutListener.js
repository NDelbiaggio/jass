const { Plie } = require('../../models/plie');
const {Play} = require('../../models/play');

const notifyAtoutChosen = require('../notifiers/notifyAtoutChosen');
const {notifyPlayerToPlay} = require('../notifiers/notifyPlayerToPlay');
const {getPlayerToChooseAtout, getChibrePlayer} = require('../notifiers/notifyToChoseAtout');

module.exports = function (io, socket, players, play) {

    socket.on('atout', (payload)=>{
        const player = getPlayerToChooseAtout(players, play);
        let expectedPlayer = player;

        if(play.chibre){
            console.log("PLAY chibre TRUE")
            expectedPlayer = getChibrePlayer(players, play);
        }
        console.log("Player id: "+player.id)
        console.log("expectedPl: " + expectedPlayer.id);
        console.log("socket: " + socket.id)
        if(expectedPlayer.id == socket.id) {
            play.atout = payload.atout; 
            play.atoutChosenBy = player.id
            notifyAtoutChosen(io, play.atout);
            notifyPlayerToPlay(io, play.atoutChosenBy);                    
        }else{
            console.log("IT IS NOT YOUR TURN TO CHOOSE ATOUT");
        }
    }); 

    socket.on('chibre', ()=>{
        const expectedPlayer = getPlayerToChooseAtout(players, play);
        if(expectedPlayer.id == socket.id){

            if(!play.chibre){
                play.chibre = socket.id;
        
                //get player who has to choose
                const player = getChibrePlayer(players, play);
        
                //contact the player who has to choose
                io.to(player.id).emit('choose atout');
            }else{
                console.log("You have already chibre!");
            }
        }else{
            console.log("IT IS NOT YOUR TURN TO CHOOSE ATOUT, SO YOU CAN'T CHIBRE!")
        }
        

    });

}

