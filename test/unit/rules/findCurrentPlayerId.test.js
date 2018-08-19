const {Player} = require('../../../models/player');
const {Play} = require('../../../models/play');
const {Plie} = require('../../../models/plie');
const {Game} = require('../../../models/game');
const {types, getCopyCard} = require('../../../db/lstCards');
const mongoose = require('mongoose');

const {findCurrentPlayer} = require('../../../communication/rules/findCurrentPlayer');


describe('findCurrentPlayerId', ()=>{
    let game;
    let atout = types.diamonds;

    beforeEach(()=>{
        game = new Game();
    });

    it("Should return the id of the player who chose atout, when it' is the beginning of the play.", ()=>{
        let playerAtout = game.players[2];
        
        game.play.setAtout(atout, playerAtout._id);
        game.play.createNewPlie();
        
        let result = game.findCurrentPlayer();

        expect(result).toBe(playerAtout);
    });

    it("Should return the leadingPlayer of the previous plie, it's not the first Plie and no cards have been played", ()=>{
        let playerAtout = game.players[2];
        let leadingPlayer = game.players[3];
        game.play.setAtout(atout, playerAtout._id);        
        let plie = new Plie(1,atout, undefined, undefined, leadingPlayer._id, undefined);
        game.play.addPlie(plie);
        game.play.createNewPlie();

        let result = game.findCurrentPlayer();

        expect(result).toBe(leadingPlayer);
    });

    it("Should return the id of the next player when there is already at least one card played", ()=> {
        let playerAtout = game.players[2];
        let leadingPlayer = game.players[3];
        let lastPlayer = game.players[2];

        game.play.setAtout(atout, playerAtout._id);
        
        let plie = new Plie(1, atout, undefined, undefined, leadingPlayer._id, undefined);
        let card = getCopyCard(atout, 8);
        plie.addCardPlayed(card, '', lastPlayer._id);
        game.play.addPlie(plie);

        let result = game.findCurrentPlayer();

        expect(result).toBe(game.players[3]);
    });

    it("Should return the first player if the last player played previously", ()=> {
        let playerAtout = game.players[2];
        let leadingPlayer = game.players[3];
        let lastPlayer = game.players[3];

        game.play.setAtout(atout, playerAtout._id);
        
        let plie = new Plie(1, atout, undefined, undefined, leadingPlayer._id, undefined);
        let card = getCopyCard(atout, 8);
        plie.addCardPlayed( card, '', lastPlayer._id);
        game.play.addPlie(plie);                

        let result = game.findCurrentPlayer();

        expect(result).toBe(game.players[0]);
    });

});