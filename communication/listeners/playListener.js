const {notifyPlayerToPlay, notifyNextPlayerToPlay} = require('../notifiers/notifyPlayerToPlay');
const {notifyToChooseTrump} = require('../notifiers/notifyToChoseTrump');
const notifyPlayPoints = require('../notifiers/notifyPlayPoints');
const {notifyActionNotAllowed} = require('../notifiers/notifyError');
const {notifyCardPlayed} = require('../notifiers/notifyCardPlayed');

const {distributeCards} = require('../rules/cardsDistribution');
const {isCardPlayable} = require('../rules/cardPlayable');
const {printPlay} = require('../../developmentTools/recordGame');

const cardsPerTrick = 4;
const eventName = "play";

module.exports = function(io, socket, players, play, game){
    
    socket.on(eventName, (card, callback) => {
        if(!play.trump){
            return callback(new Error("Trump has not been set yet, action denied!"));
        }
        
        let trick = play.getLastTrick();           
        let currentPlayer = game.findCurrentPlayer();

        let requestPlayer = game.getPlayerFromId(socket.id);

        if(requestPlayer._id != currentPlayer._id) {
            return callback(new Error(`IT IS NOT YOUR TURN, IT IS ${currentPlayer.name} turn`));     
        };

        const isAllowedToBePlayed = isCardPlayable(card, play.trump, trick, currentPlayer.cards);    

        if(isAllowedToBePlayed){
            //1) add the card to the trick
            const success = currentPlayer.playCard(card.id);
            if(!success){
                return callback('Invalid card id');
            }
            const trickLength = play.getLastTrick().addCardPlayed(card, currentPlayer.name, currentPlayer._id);
            callback(null, 'Card played successfully.');
            //2) notify the others players about the card
            notifyCardPlayed(io, card, currentPlayer.name);

            //3) check if 4 cards have been played
            if(trickLength == cardsPerTrick){
                if(trick.number == 9){
                    calculateAndNotifyPoints(play, game.teamA, game.teamB);

                    // printPlay(play, players, ()=>{
                    //     console.log("The play has been saved.");
                    // })

                    play.clearTricks();
                    distributeCards(io, players, ()=>{
                        notifyToChooseTrump(io, players, play);
                    });
                    
                }else{
                    play.createNewTrick();
                    let leader = players.find(p=> p._id == trick.leadingPlayer);                 
                    notifyPlayerToPlay(io, leader.name);
                }
            }else{
                let currentPlayerInd = players.indexOf(currentPlayer);
                notifyNextPlayerToPlay(io, players, currentPlayerInd);
            }
        }else {
            return callback(new Error("It is not allowed to play this card"));
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
