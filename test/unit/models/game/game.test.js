const {types, getCopyCard } = require('../../../../db/deck');
const {Game} = require('../../../../models/game');

describe('Object Game', ()=>{


    it('should return true if one player has not been set and isPlaceAvailable is called',()=>{
        let game = new Game();
        let result = game.isPlaceAvailable();
        expect(result).toBeTruthy();
    });

    it('Should return false if all the players are set and isPlaceAvailable is called', ()=>{
        let game = new Game();
        game.setNewPlayer('a', 'a');
        game.setNewPlayer('a', 'b');
        game.setNewPlayer('a', 'c');
        game.setNewPlayer('a', 'd');

        let result = game.isPlaceAvailable();
        expect(result).toBeFalsy();
    });

    it('Should return false if a player is set but there is no place and setNewPlayer is called',()=>{
        let game = new Game();
        game.setNewPlayer('a', 'a');
        game.setNewPlayer('a', 'b');
        game.setNewPlayer('a', 'c');
        game.setNewPlayer('a', 'd');
        let player = game.setNewPlayer('a', 'd');

        expect(player).not.toBeDefined();
    });

    
    it('Should return true if at least on player has a card and playersHaveCards is called', ()=>{
        let game = new Game();
        game.setNewPlayer('a', 'a');
        game.setNewPlayer('a', 'a');
        game.setNewPlayer('a', 'a');
        let player = game.setNewPlayer('a', 'a');
        player.addCardToHand(getCopyCard(types.diamonds, 7));

        const result = game.playersHaveCards();

        expect(result).toBeTruthy();
    });

    it('should return the number of player connected when getNumberOfPlayersConnected', ()=>{
        let game = new Game();
        game.setNewPlayer('a', 'a');
        game.setNewPlayer('a', 'a');
        game.setNewPlayer('a', 'a');

        const result = game.getNumberOfPlayersConnected();

        expect(result).toBe(3);
    })
})