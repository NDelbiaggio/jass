const {types, getCopyCard} = require('../../../../db/deck');
const {Play} = require('../../../../models/play');
const {Trick} = require('../../../../models/trick');
const {Team} = require('../../../../models/team');
const {Action} = require('../../../../models/action');
const {Player} = require('../../../../models/player');
const mongoose = require('mongoose');

describe("play.calculatePointsTeam", ()=>{
    let player1 = new Player();
    let player2 = new Player();
    let player3 = new Player();
    let player4 = new Player();
    
    let teamA = new Team([player1, player3]);
    let teamB = new Team([player2, player4]);

    let trump;
    beforeEach(()=>{
        trump = types.diamonds;
    })


    it('should return 257 points for one team and 0 for the other one when a team gets all the tricks', ()=>{
        let play = new Play([], trump);
        let actions = [
            new Action('', getCopyCard(types.diamonds, 11)),
            new Action('',getCopyCard(types.diamonds, 6)),
            new Action('',getCopyCard(types.diamonds, 14)),
            new Action('',getCopyCard(types.spades, 13))    
        ];
        let trick = new Trick(1, trump, actions, 0, player1.getPlayerId(), player2.getPlayerId());
        play.addTrick(trick);
        
        actions = [
            new Action('',getCopyCard(types.diamonds, 9)),
            new Action('',getCopyCard(types.diamonds, 12)),
            new Action('',getCopyCard(types.spades, 7)),
            new Action('',getCopyCard(types.spades, 11))     
        ]
        trick = new Trick(2, trump, actions, 0, player1.getPlayerId(), player2.getPlayerId());
        play.addTrick(trick);
        
        actions = [
            new Action('',getCopyCard(types.hearts, 13)),
            new Action('',getCopyCard(types.hearts, 9)),
            new Action('',getCopyCard(types.hearts, 10)),
            new Action('',getCopyCard(types.hearts, 6)), 
        ]
        trick = new Trick(3, trump, actions, 0, player1.getPlayerId(), player2.getPlayerId());
        play.addTrick(trick);
        
        actions = [
            new Action('',getCopyCard(types.diamonds, 7)),
            new Action('',getCopyCard(types.hearts, 14)),
            new Action('',getCopyCard(types.clubs, 6)),
            new Action('',getCopyCard(types.clubs, 12)),
        ]
        trick = new Trick(4, trump, actions, 0, player1.getPlayerId(), player2.getPlayerId());
        play.addTrick(trick);
        
        actions = [
            new Action('',getCopyCard(types.diamonds, 8)),
            new Action('',getCopyCard(types.clubs, 14)),
            new Action('',getCopyCard(types.clubs, 7)),
            new Action('',getCopyCard(types.clubs, 10)),  
        ]
        trick = new Trick(5, trump, actions, 0, player1.getPlayerId(), player2.getPlayerId());
        play.addTrick(trick);
        
        actions = [
            new Action('',getCopyCard(types.diamonds, 10)),
            new Action('',getCopyCard(types.spades, 14)),
            new Action('',getCopyCard(types.clubs, 8)),
            new Action('',getCopyCard(types.hearts, 7)),       
        ]
        trick = new Trick(6, trump, actions, 0, player1.getPlayerId(), player2.getPlayerId());
        play.addTrick(trick);
        
        actions = [
            new Action('',getCopyCard(types.diamonds, 13)),
            new Action('',getCopyCard(types.clubs, 13)),
            new Action('',getCopyCard(types.hearts, 12)),
            new Action('',getCopyCard(types.hearts, 8)),      
        ]
        trick = new Trick(7,trump, actions, 0, player1.getPlayerId(), player2.getPlayerId());
        play.addTrick(trick);
        
        actions = [
            new Action('',getCopyCard(types.spades, 10)),
            new Action('',getCopyCard(types.spades, 6)),
            new Action('',getCopyCard(types.hearts, 11)),
            new Action('',getCopyCard(types.spades, 9)),        
        ]
        trick = new Trick(8, trump, actions, 0, player3.getPlayerId(), player2.getPlayerId());
        play.addTrick(trick);

        actions = [
            new Action('',getCopyCard(types.clubs, 9)),
            new Action('',getCopyCard(types.spades, 8)),
            new Action('',getCopyCard(types.clubs, 11)),
            new Action('',getCopyCard(types.spades, 12)),    
        ]
        trick = new Trick(9, trump, actions, 0, player1.getPlayerId(), player4.getPlayerId());
        play.addTrick(trick);

        const resultA = play.calculatePointsTeam(teamA);
        const resultB = play.calculatePointsTeam(teamB);

        expect(resultA).toBe(257);
        expect(resultB).toBe(0);
    });

    it('should the sum of the two teams points has to be equal to 157 if both teams have at least one trick', ()=>{
        let play = new Play([], types.diamonds);
        let actions = [
            new Action('',getCopyCard(types.diamonds, 11)),
            new Action('',getCopyCard(types.diamonds, 6)),
            new Action('',getCopyCard(types.diamonds, 12)),
            new Action('',getCopyCard(types.diamonds, 8)),
        ];
        let trick = new Trick(1, trump, actions, 0, player1.getPlayerId(), player4.getPlayerId());
        play.addTrick(trick);
        
        actions = [
            new Action('',getCopyCard(types.diamonds, 7)),
            new Action('',getCopyCard(types.spades, 6)),
            new Action('',getCopyCard(types.diamonds, 13)),
            new Action('',getCopyCard(types.hearts, 6)),
        ]
        trick = new Trick(2, trump, actions, 2, player3.getPlayerId(), player4.getPlayerId());
        play.addTrick(trick);
        
        actions = [
            new Action('',getCopyCard(types.diamonds, 9)),
            new Action('',getCopyCard(types.clubs, 11)),
            new Action('',getCopyCard(types.diamonds, 10)),
            new Action('',getCopyCard(types.hearts, 7)),
        ]
        trick = new Trick(3, trump, actions, 0, player3.getPlayerId(), player2.getPlayerId());
        play.addTrick(trick);
        
        actions = [
            new Action('',getCopyCard(types.clubs, 6)),
            new Action('',getCopyCard(types.spades, 7)),
            new Action('',getCopyCard(types.clubs, 13)),
            new Action('',getCopyCard(types.clubs, 14)),
        ]
        trick = new Trick(4, trump, actions, 3, player2.getPlayerId(), player2.getPlayerId());
        play.addTrick(trick);
        
        actions = [
            new Action('',getCopyCard(types.clubs, 7)),
            new Action('',getCopyCard(types.clubs, 12)),
            new Action('',getCopyCard(types.spades, 12)),
            new Action('',getCopyCard(types.hearts, 8)),
        ]
        trick = new Trick(5, trump, actions, 1, player3.getPlayerId(), player1.getPlayerId());
        play.addTrick(trick);
        
        actions = [
            new Action('',getCopyCard(types.clubs, 10)),
            new Action('',getCopyCard(types.spades, 13)),
            new Action('',getCopyCard(types.spades, 9)),
            new Action('',getCopyCard(types.clubs, 9)),
        ]
        trick = new Trick(6, trump, actions, 0, player3.getPlayerId(), player2.getPlayerId());
        play.addTrick(trick);
        
        actions = [
            new Action('',getCopyCard(types.clubs, 8)),
            new Action('',getCopyCard(types.hearts, 12)),
            new Action('',getCopyCard(types.hearts, 9)),
            new Action('',getCopyCard(types.hearts, 10)),
        ]
        trick = new Trick(7, trump, actions, 0, player3.getPlayerId(), player2.getPlayerId());
        play.addTrick(trick);
        
        actions = [
            new Action('',getCopyCard(types.spades, 10)),
            new Action('',getCopyCard(types.spades, 14)),
            new Action('',getCopyCard(types.hearts, 11)),
            new Action('',getCopyCard(types.spades, 8)),
        ]
        trick = new Trick(8, trump, actions, 1, player4.getPlayerId(), player2.getPlayerId());
        play.addTrick(trick);

        actions = [
            new Action('',getCopyCard(types.hearts, 14)),
            new Action('',getCopyCard(types.diamonds, 14)),
            new Action('',getCopyCard(types.spades, 11)),
            new Action('',getCopyCard(types.hearts, 13)),
        ]
        trick = new Trick(9, trump, actions, 1, player1.getPlayerId(), player3.getPlayerId());
        play.addTrick(trick);
        
        const resultA = play.calculatePointsTeam(teamA);
        const resultB = play.calculatePointsTeam(teamB);

        expect(resultA).toBe(119);
        expect(resultB).toBe(157-resultA);

    });

    it('should not give 100 bonus when a team got 157pts but not all the tricks', ()=>{
        trump = types.clubs;
        let play = new Play([], trump);
        let actions = [
            new Action('',getCopyCard(types.spades, 14)),
            new Action('',getCopyCard(types.spades, 12)),
            new Action('',getCopyCard(types.spades, 11)),
            new Action('',getCopyCard(types.spades, 13)),     
        ];
        let trick = new Trick(1, trump, actions, 0, player1.getPlayerId(), player4.getPlayerId());
        play.addTrick(trick);
        
        actions = [
            new Action('',getCopyCard(types.hearts, 6)),
            new Action('',getCopyCard(types.diamonds, 13)),
            new Action('',getCopyCard(types.hearts, 14)),
            new Action('',getCopyCard(types.hearts, 10)),     
        ]
        trick = new Trick(2, trump, actions, 2, player3.getPlayerId(), player4.getPlayerId());
        play.addTrick(trick);
        
        actions = [
            new Action('',getCopyCard(types.hearts, 12)),
            new Action('',getCopyCard(types.hearts, 7)),
            new Action('',getCopyCard(types.hearts, 13)),
            new Action('',getCopyCard(types.diamonds, 10)),     
        ]
        trick = new Trick(3, trump, actions, 2, player1.getPlayerId(), player2.getPlayerId());
        play.addTrick(trick);
        
        actions = [
            new Action('',getCopyCard(types.spades, 6)),
            new Action('',getCopyCard(types.spades, 7)),
            new Action('',getCopyCard(types.hearts, 8)),
            new Action('',getCopyCard(types.spades, 8)),     
        ]
        trick = new Trick(4, trump, actions, 3, player4.getPlayerId(), player4.getPlayerId());
        play.addTrick(trick);
        
        actions = [
            new Action('',getCopyCard(types.clubs, 14)),
            new Action('',getCopyCard(types.diamonds, 7)),
            new Action('',getCopyCard(types.clubs, 13)),
            new Action('',getCopyCard(types.clubs, 11)),     
        ]
        trick = new Trick(5, trump, actions, 3, player3.getPlayerId(), player3.getPlayerId());
        play.addTrick(trick);
        
        actions = [
            new Action('',getCopyCard(types.clubs, 9)),
            new Action('',getCopyCard(types.clubs, 12)),
            new Action('',getCopyCard(types.spades, 9)),
            new Action('',getCopyCard(types.clubs, 8)),     
        ]
        trick = new Trick(6, trump, actions, 0, player3.getPlayerId(), player2.getPlayerId());
        play.addTrick(trick);
        
        actions = [
            new Action('',getCopyCard(types.clubs, 10)),
            new Action('',getCopyCard(types.diamonds, 14)),
            new Action('',getCopyCard(types.diamonds, 9)),
            new Action('',getCopyCard(types.clubs, 7)),     
        ]
        trick = new Trick(7, trump, actions, 0, player3.getPlayerId(), player2.getPlayerId());
        play.addTrick(trick);
        
        actions = [
            new Action('',getCopyCard(types.hearts, 11)),
            new Action('',getCopyCard(types.diamonds, 12)),
            new Action('',getCopyCard(types.hearts, 9)),
            new Action('',getCopyCard(types.spades, 10)),     
        ]
        trick = new Trick(8, trump, actions, 0, player3.getPlayerId(), player2.getPlayerId());
        play.addTrick(trick);

        actions = [
            new Action('',getCopyCard(types.clubs, 6)),
            new Action('',getCopyCard(types.diamonds, 11)),
            new Action('',getCopyCard(types.diamonds, 8)),
            new Action('',getCopyCard(types.diamonds, 6)),     
        ]
        trick = new Trick(9, trump, actions, 0, player3.getPlayerId(), player2.getPlayerId());
        play.addTrick(trick);
            
        const resultA = play.calculatePointsTeam(teamA);
        const resultB = play.calculatePointsTeam(teamB);
        
        expect(resultA).toBe(157);
        expect(resultB).toBe(0);
    })

});
