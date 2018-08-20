const {Player} = require('../../../models/player');
const {Play} = require('../../../models/play');
const {Trick} = require('../../../models/trick');
const {Game} = require('../../../models/game');
const {types, getCopyCard} = require('../../../db/deck');
const mongoose = require('mongoose');

const {findCurrentPlayer} = require('../../../communication/rules/findCurrentPlayer');


describe('findCurrentPlayerId', ()=>{
    let game;
    let trump = types.diamonds;

    beforeEach(()=>{
        game = new Game();
    });

    it("Should return the id of the player who chose trump, when it' is the beginning of the play.", ()=>{
        let playerTrump = game.players[2];
        
        game.play.setTrump(trump, playerTrump._id);
        game.play.createNewTrick();
        
        let result = game.findCurrentPlayer();

        expect(result).toBe(playerTrump);
    });

    it("Should return the leadingPlayer of the previous trick, it's not the first Trick and no cards have been played", ()=>{
        let playerTrump = game.players[2];
        let leadingPlayer = game.players[3];
        game.play.setTrump(trump, playerTrump._id);        
        let trick = new Trick(1,trump, undefined, undefined, leadingPlayer._id, undefined);
        game.play.addTrick(trick);
        game.play.createNewTrick();

        let result = game.findCurrentPlayer();

        expect(result).toBe(leadingPlayer);
    });

    it("Should return the id of the next player when there is already at least one card played", ()=> {
        let playerTrump = game.players[2];
        let leadingPlayer = game.players[3];
        let lastPlayer = game.players[2];

        game.play.setTrump(trump, playerTrump._id);
        
        let trick = new Trick(1, trump, undefined, undefined, leadingPlayer._id, undefined);
        let card = getCopyCard(trump, 8);
        trick.addCardPlayed(card, '', lastPlayer._id);
        game.play.addTrick(trick);

        let result = game.findCurrentPlayer();

        expect(result).toBe(game.players[3]);
    });

    it("Should return the first player if the last player played previously", ()=> {
        let playerTrump = game.players[2];
        let leadingPlayer = game.players[3];
        let lastPlayer = game.players[3];

        game.play.setTrump(trump, playerTrump._id);
        
        let trick = new Trick(1, trump, undefined, undefined, leadingPlayer._id, undefined);
        let card = getCopyCard(trump, 8);
        trick.addCardPlayed( card, '', lastPlayer._id);
        game.play.addTrick(trick);                

        let result = game.findCurrentPlayer();

        expect(result).toBe(game.players[0]);
    });

});