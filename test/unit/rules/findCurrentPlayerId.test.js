const {Player} = require('../../../models/player');
const {Play} = require('../../../models/play');
const {Plie} = require('../../../models/plie');
const {types, getCopyCard} = require('../../../db/lstCards');

const {findCurrentPlayer} = require('../../../communication/rules/findCurrentPlayer');


describe('findCurrentPlayerId', ()=>{
    let players = [
        new Player({id: "77bd-4E1AQ7s8uBKAAAF"}),
        new Player({id: "OXjuG7o8cqu6b8DDAAAE"}),
        new Player({id: "_ilsUvWO4jA5-1-fAAAH"}),
        new Player({id: "3yhkUDmo1sNULXDbAAAG"})
    ]

    it("Should return the id of the player who chose atout, when it' is the beginning of the play.", ()=>{
        let playerAtout = players[2];
        
        let plie = new Plie();
        let play = new Play({
            atoutChosenBy: playerAtout.id
        });
        
        let result = findCurrentPlayer(plie, play, players);

        expect(result).toBe(playerAtout);
    });

    it("Should return the leadingPlayer of the previous plie, it's not the first Plie and no cards have been played", ()=>{
        let playerAtout = players[2];
        let leadingPlayer = players[3];
        
        let play = new Play({
            plies : [
                new Plie({number : 1, leadingPlayer: leadingPlayer.id})
            ],
            atoutChosenBy: playerAtout.id
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
                new Plie({number : 1, leadingPlayer: leadingPlayer.id})
            ],
            atoutChosenBy: playerAtout.id
        });
                
        let plie = play.createNewPlie();
        let card = getCopyCard(types.diamonds, 8);
        plie.addCardPlayed(types.diamonds, card, lastPlayer.id);

        let result = findCurrentPlayer(plie, play, players);

        expect(result).toBe(players[3]);
    });

});