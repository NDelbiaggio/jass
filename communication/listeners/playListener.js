const {notifyPlayerToPlay, notifyNextPlayerToPlay} = require('../notifiers/notifyPlayerToPlay');
const {notifyToChooseAtout} = require('../notifiers/notifyToChoseAtout');
const notifyPlayPoints = require('../notifiers/notifyPlayPoints');

const {Play} = require('../../models/play');

const distributeCards = require('../rules/cardsDistribution');
const {isCardPlayable} = require('../rules/cardPlayable');
const {findCurrentPlayer} = require('../rules/findCurrentPlayer');
const {printPlay} = require('../../developmentTools/recordGame');

const cardsPerPlie = 4;
const eventName = "play";

module.exports = function(io, socket, players, play, teamA, teamB){
    
    var playLst = socket.on(eventName, (card) => {
        let plie = play.getCurrentPlie();          
        let currentPlayer = findCurrentPlayer(plie, play, players);     

        //Check if the correct player played
        if(socket.id != currentPlayer.id) {
            return console.log(`IT IS NOT YOUR TURN, IT IS ${currentPlayer.id} turn`);            
        };

        const isAllowedToBePlayed = isCardPlayable(card, play.atout, plie, currentPlayer.cards);    

        if(isAllowedToBePlayed){
            //1) add the card to the plie
            currentPlayer.playCard(card._id);
            const plieLength = play.getCurrentPlie().addCardPlayed(play.atout, card, socket.id);
            
            //2) notify the others players about the card
            io.emit('card played', {card});

            //3) check if 4 cards have been played
            if(plieLength == cardsPerPlie){
                if(plie.number == 9){
                    calculateAndNotifyPoints(play, teamA, teamB);

                    printPlay(play, players, ()=>{
                        console.log("The play has been saved.");
                        play.clearPlies();
                        distributeCards(io, players, ()=>{
                            notifyToChooseAtout(io, players, play);
                        });
                    })

                }else{
                    play.createNewPlie();
                    let leader = players.find(p=> p.id == plie.leadingPlayer);                 
                    notifyPlayerToPlay(io, leader.id);
                }
            }else{
                let currentPlayerInd = players.indexOf(currentPlayer);
                notifyNextPlayerToPlay(io, players, currentPlayerInd);
            }
        }else {
            throw new Error('it is not allowed to play this card');
        }
    });

    function calculateAndNotifyPoints(play, teamA, teamB){
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
