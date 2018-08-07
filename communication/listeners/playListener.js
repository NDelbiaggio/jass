const {notifyPlayerToPlay, notifyNextPlayerToPlay} = require('../notifiers/notifyPlayerToPlay');
const notifyToChoseAtout = require('../notifiers/notifyToChoseAtout');

const {Play} = require('../../models/play');

const distributeCards = require('../rules/cardsDistribution');
const {isCardPlayable} = require('../rules/cardPlayable');
const printResults = require('../../developmentTools/recordGame');

const cardsPerPlie = 4;
const eventName = "play";

module.exports = function(io, socket, players, play){
    
    var playLst = socket.on(eventName, (card) => {
        let plie = play.getCurrentPlie();          
        let currentPlayerId = findCurrentPlayer(plie, play, players);        

        //Check if the correct player played
        if(socket.id != currentPlayerId) {
            return console.log(`IT IS NOT YOUR TURN, IT IS ${currentPlayerId} turn`);            
        };

        let player = players.find((p)=>p.id == socket.id);     
        const isAllowedToBePlayed = isCardPlayable(card, play.atout, plie, player.cards);    

        if(isAllowedToBePlayed){
            //1) add the card to the plie
            player.playCard(card._id);
            
            const plieLength = play.getCurrentPlie().addCardPlayed(play.atout, card, socket.id);
            
            //2) notify the others players about the card
            io.emit('card played', {card});

            //3) check if 4 cards have been played
            if(plieLength == cardsPerPlie){
                //3b) update the play points

                //3c) create a new plie
                if(plie.number == 9){
                    console.log(play)
                    printResults(play, players, ()=>{
                        console.log("The play has been saved.");
                        play.clearPlies();
                        distributeCards(io, players, ()=>{
                            notifyToChoseAtout(io, players, play);
                        });
                    })
                    // const pointA = play.calculatePointsTeam([players[0],players[2]]);
                    // const pointB = play.calculatePointsTeam([players[1],players[3]]);
                    // console.log("POINTSA : ")
                    // console.log("POINTSB : ")

                    
                }else{
                    play.createNewPlie();
                    let leader = players.find(p=> p.id == plie.leadingPlayer);                 
                    notifyPlayerToPlay(io, leader.id);
                }
            }else{
                let currentPlayerInd = players.indexOf(player);
                notifyNextPlayerToPlay(io, players, currentPlayerInd);
            }
        }else {
            throw new Error('it is not allowed to play this card');
        }
    });
}

function findCurrentPlayer(plie, play, players){
    if(plie.cards.length == 0){
        if(plie.number == 1){
            return play.atoutChosenBy;
        }else{
            let lastPlie = play.getPreviousPlie();
            return lastPlie.leadingPlayer;
        }
    }else{
        let lastPlayerInd = players.findIndex((p)=>p.id == plie.lastPlayer);
        nxtInd = lastPlayerInd == players.length-1? 0: lastPlayerInd + 1;
        return players[nxtInd].id;
    }
}




