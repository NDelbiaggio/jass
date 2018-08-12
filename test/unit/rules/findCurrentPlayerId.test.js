const {Player} = require('../../../models/player');
const {Play} = require('../../../models/play');
const {Plie} = require('../../../models/plie');
const {types, getCopyCard} = require('../../../db/lstCards');
const mongoose = require('mongoose');

const {findCurrentPlayer} = require('../../../communication/rules/findCurrentPlayer');


describe('findCurrentPlayerId', ()=>{
    let player1 = mongoose.Types.ObjectId();
    let player2 = mongoose.Types.ObjectId();
    let player3 = mongoose.Types.ObjectId();
    let player4 = mongoose.Types.ObjectId();

    let players = [
        new Player({_id: player1}),
        new Player({_id: player2}),
        new Player({_id: player3}),
        new Player({_id: player4})
    ]

    it("Should return the id of the player who chose atout, when it' is the beginning of the play.", ()=>{
        let playerAtout = players[2];
        
        let plie = new Plie();
        let play = new Play({
            atoutChosenBy: playerAtout._id
        });
        
        let result = findCurrentPlayer(plie, play, players);

        expect(result).toBe(playerAtout);
    });

    it("Should return the leadingPlayer of the previous plie, it's not the first Plie and no cards have been played", ()=>{
        let playerAtout = players[2];
        let leadingPlayer = players[3];
        
        let play = new Play({
            plies : [
                new Plie({number : 1, leadingPlayer: leadingPlayer._id})
            ],
            atoutChosenBy: playerAtout._id
        });
                
        let plie = play.createNewPlie();
        let result = findCurrentPlayer(plie, play, players);

        expect(result).toBe(leadingPlayer);
    });

    it("Should return the id of the next player when there is already at least one card played", ()=> {
        let playerAtout = players[2];
        let leadingPlayer = players[3];
        let lastPlayer = players[2];

        let play = new Play({
            plies : [
                new Plie({number : 1, leadingPlayer: leadingPlayer._id})
            ],
            atoutChosenBy: playerAtout._id
        });
                
        let plie = play.createNewPlie();
        let card = getCopyCard(types.diamonds, 8);
        plie.addCardPlayed(types.diamonds, card, lastPlayer._id);

        let result = findCurrentPlayer(plie, play, players);

        expect(result).toBe(players[3]);
    });

    it("Should return the first player if the last player played previously", ()=> {
        let playerAtout = players[2];
        let leadingPlayer = players[3];
        let lastPlayer = players[3];

        let play = new Play({
            plies : [
                new Plie({number : 1, leadingPlayer: leadingPlayer._id})
            ],
            atoutChosenBy: playerAtout._id
        });
                
        let plie = play.createNewPlie();
        let card = getCopyCard(types.diamonds, 8);
        plie.addCardPlayed(types.diamonds, card, lastPlayer._id);

        let result = findCurrentPlayer(plie, play, players);

        expect(result).toBe(players[0]);
    });

});