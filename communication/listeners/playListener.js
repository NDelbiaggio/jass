const {notifyPlayerToPlay, notifyNextPlayerToPlay} = require('../notifiers/notifyPlayerToPlay');
const {notifyToChooseAtout} = require('../notifiers/notifyToChoseAtout');
const notifyPlayPoints = require('../notifiers/notifyPlayPoints');
const {notifyActionNotAllowed} = require('../notifiers/notifyError');
const {notifyCardPlayed} = require('../notifiers/notifyCardPlayed');

const {distributeCards} = require('../rules/cardsDistribution');
const {isCardPlayable} = require('../rules/cardPlayable');
const {findCurrentPlayer} = require('../rules/findCurrentPlayer');
const {printPlay} = require('../../developmentTools/recordGame');

const cardsPerPlie = 4;
const eventName = "play";

module.exports = function(io, socket, players, play, game){
    
    socket.on(eventName, (card) => {
        if(!play.atout){
            return notifyActionNotAllowed(socket, "Atout has not been set yet, action denied!")
        }
        
        let plie = play.getLastPlie();           
        let currentPlayer = game.findCurrentPlayer();     
        let requestPlayer = game.getPlayerFromId(socket.id);

        //Check if the correct player played
        if(requestPlayer._id != currentPlayer._id) {
            console.log('currentPlayer: ', currentPlayer)
            console.log('requestPlayer: ', requestPlayer)
            return console.log(`IT IS NOT YOUR TURN, IT IS ${currentPlayer.id} turn`);            
        };

        const isAllowedToBePlayed = isCardPlayable(card, play.atout, plie, currentPlayer.cards);    

        if(isAllowedToBePlayed){
            //1) add the card to the plie
            const success = currentPlayer.playCard(card.id);
            if(!success){
                throw new Error(`Card not valid ${cardExist}`);
            }
            const plieLength = play.getLastPlie().addCardPlayed(card, currentPlayer.name, currentPlayer._id);
            
            //2) notify the others players about the card
            notifyCardPlayed(io, card, currentPlayer.name);

            //3) check if 4 cards have been played
            if(plieLength == cardsPerPlie){
                if(plie.number == 9){
                    calculateAndNotifyPoints(play, game.teamA, game.teamB);

                    // printPlay(play, players, ()=>{
                    //     console.log("The play has been saved.");
                    // })

                    play.clearPlies();
                    distributeCards(io, players, ()=>{
                        notifyToChooseAtout(io, players, play);
                    });
                    
                }else{
                    play.createNewPlie();
                    let leader = players.find(p=> p._id == plie.leadingPlayer);                 
                    notifyPlayerToPlay(io, leader.name);
                }
            }else{
                let currentPlayerInd = players.indexOf(currentPlayer);
                notifyNextPlayerToPlay(io, players, currentPlayerInd);
            }
        }else {
            return notifyActionNotAllowed(socket, "It is not allowed to play this card")
        }
    });

    function calculateAndNotifyPoints(play, teamA, teamB){
        console.log("SENDING POINTS")
        const pointsA = play.calculatePointsTeam(teamA);
        const pointsB = play.calculatePointsTeam(teamB);

        teamA.increasePoints(pointsA);
        teamB.increasePoints(pointsB);

        notifyPlayPoints(io, {
            totalA : teamA.points,
            totalB : teamB.points,
            playPointsA : pointsA,
            playPointsB : pointsB
        });
    }
}
