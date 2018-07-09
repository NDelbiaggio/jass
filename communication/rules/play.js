const { Plie } = require('../../models/plie');
const {isCardPlayable} = require('./cardPlayable');
const {getCurrentHands} = require('../../db/hands');

let plie = new Plie();
let atout; 
let hands;
let io;
const cardsPerPlie = 4;

let nextPlayer;

module.exports = function (ioParam, socket, players) {
    io = ioParam;

    socket.on('atout', (payload)=>{
        hands = getCurrentHands();
        atout = payload.atout;
        io.emit('atout chosen', {
            atout
        });
        nextPlayer = players.length;
        notifyPlayerToPlay();
    });

    socket.on('play', (card) => {
        //Check if the correct player played
        if(socket.id != players[nextPlayer].id) {
            return console.log('IT IS NOT YOUR TURN')            
        }

        //GET THE HAND of the player
        hand = hands.find((hand)=>{
            return hand.player == socket.id
        });

        //Validate if the play is correct
        const isValid = isCardPlayable(card, atout, plie, hand);

        if(isValid){
            //1) add the card to the plie
            const plieLength = plie.addCardPlayed(atout, card);
            //2) notify the others players about the card
            io.emit('card played', {card});
            //3) check if 4 cards have been played
            if(plieLength == cardsPerPlie){
                //3a) calculate points
                //3b) update the play points
                //3c) create a new plie
                if(plie.number == 9){
                    //finish the play
                    // count points
                }else{
                    plie = new Plie({
                        number: plie.number
                    });
                }
            }
            //3not) notify next player
            notifyPlayerToPlay();
        }else {
            throw new Error('it is not allowed to play this card');
        }
        
    });

    
    function notifyPlayerToPlay(){
        nextPlayer = (nextPlayer + 1) >= players.length? 0: nextPlayer + 1;
        io.to(players[nextPlayer].id).emit('your turn');
    }

}

