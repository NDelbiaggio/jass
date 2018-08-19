const {types, getCopyCard} = require('../../../../db/lstCards');
const {Play} = require('../../../../models/play');
const {Plie} = require('../../../../models/plie');
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

    let atout;
    beforeEach(()=>{
        atout = types.diamonds;
    })


    it('should return 257 points for one team and 0 for the other one when a team gets all the plies', ()=>{
        let play = new Play([], atout);
        let actions = [
            new Action('', getCopyCard(types.diamonds, 11)),
            new Action('',getCopyCard(types.diamonds, 6)),
            new Action('',getCopyCard(types.diamonds, 14)),
            new Action('',getCopyCard(types.spades, 13))    
        ];
        let plie = new Plie(1, atout, actions, 0, player1.getPlayerId(), player2.getPlayerId());
        play.addPlie(plie);
        
        actions = [
            new Action('',getCopyCard(types.diamonds, 9)),
            new Action('',getCopyCard(types.diamonds, 12)),
            new Action('',getCopyCard(types.spades, 7)),
            new Action('',getCopyCard(types.spades, 11))     
        ]
        plie = new Plie(2, atout, actions, 0, player1.getPlayerId(), player2.getPlayerId());
        play.addPlie(plie);
        
        actions = [
            new Action('',getCopyCard(types.hearts, 13)),
            new Action('',getCopyCard(types.hearts, 9)),
            new Action('',getCopyCard(types.hearts, 10)),
            new Action('',getCopyCard(types.hearts, 6)), 
        ]
        plie = new Plie(3, atout, actions, 0, player1.getPlayerId(), player2.getPlayerId());
        play.addPlie(plie);
        
        actions = [
            new Action('',getCopyCard(types.diamonds, 7)),
            new Action('',getCopyCard(types.hearts, 14)),
            new Action('',getCopyCard(types.clubs, 6)),
            new Action('',getCopyCard(types.clubs, 12)),
        ]
        plie = new Plie(4, atout, actions, 0, player1.getPlayerId(), player2.getPlayerId());
        play.addPlie(plie);
        
        actions = [
            new Action('',getCopyCard(types.diamonds, 8)),
            new Action('',getCopyCard(types.clubs, 14)),
            new Action('',getCopyCard(types.clubs, 7)),
            new Action('',getCopyCard(types.clubs, 10)),  
        ]
        plie = new Plie(5, atout, actions, 0, player1.getPlayerId(), player2.getPlayerId());
        play.addPlie(plie);
        
        actions = [
            new Action('',getCopyCard(types.diamonds, 10)),
            new Action('',getCopyCard(types.spades, 14)),
            new Action('',getCopyCard(types.clubs, 8)),
            new Action('',getCopyCard(types.hearts, 7)),       
        ]
        plie = new Plie(6, atout, actions, 0, player1.getPlayerId(), player2.getPlayerId());
        play.addPlie(plie);
        
        actions = [
            new Action('',getCopyCard(types.diamonds, 13)),
            new Action('',getCopyCard(types.clubs, 13)),
            new Action('',getCopyCard(types.hearts, 12)),
            new Action('',getCopyCard(types.hearts, 8)),      
        ]
        plie = new Plie(7,atout, actions, 0, player1.getPlayerId(), player2.getPlayerId());
        play.addPlie(plie);
        
        actions = [
            new Action('',getCopyCard(types.spades, 10)),
            new Action('',getCopyCard(types.spades, 6)),
            new Action('',getCopyCard(types.hearts, 11)),
            new Action('',getCopyCard(types.spades, 9)),        
        ]
        plie = new Plie(8, atout, actions, 0, player3.getPlayerId(), player2.getPlayerId());
        play.addPlie(plie);

        actions = [
            new Action('',getCopyCard(types.clubs, 9)),
            new Action('',getCopyCard(types.spades, 8)),
            new Action('',getCopyCard(types.clubs, 11)),
            new Action('',getCopyCard(types.spades, 12)),    
        ]
        plie = new Plie(9, atout, actions, 0, player1.getPlayerId(), player4.getPlayerId());
        play.addPlie(plie);

        const resultA = play.calculatePointsTeam(teamA);
        const resultB = play.calculatePointsTeam(teamB);

        expect(resultA).toBe(257);
        expect(resultB).toBe(0);
    });

    it('should the sum of the two teams points has to be equal to 157 if both teams have at least one plie', ()=>{
        let play = new Play([], types.diamonds);
        let actions = [
            new Action('',getCopyCard(types.diamonds, 11)),
            new Action('',getCopyCard(types.diamonds, 6)),
            new Action('',getCopyCard(types.diamonds, 12)),
            new Action('',getCopyCard(types.diamonds, 8)),
        ];
        let plie = new Plie(1, atout, actions, 0, player1.getPlayerId(), player4.getPlayerId());
        play.addPlie(plie);
        
        actions = [
            new Action('',getCopyCard(types.diamonds, 7)),
            new Action('',getCopyCard(types.spades, 6)),
            new Action('',getCopyCard(types.diamonds, 13)),
            new Action('',getCopyCard(types.hearts, 6)),
        ]
        plie = new Plie(2, atout, actions, 2, player3.getPlayerId(), player4.getPlayerId());
        play.addPlie(plie);
        
        actions = [
            new Action('',getCopyCard(types.diamonds, 9)),
            new Action('',getCopyCard(types.clubs, 11)),
            new Action('',getCopyCard(types.diamonds, 10)),
            new Action('',getCopyCard(types.hearts, 7)),
        ]
        plie = new Plie(3, atout, actions, 0, player3.getPlayerId(), player2.getPlayerId());
        play.addPlie(plie);
        
        actions = [
            new Action('',getCopyCard(types.clubs, 6)),
            new Action('',getCopyCard(types.spades, 7)),
            new Action('',getCopyCard(types.clubs, 13)),
            new Action('',getCopyCard(types.clubs, 14)),
        ]
        plie = new Plie(4, atout, actions, 3, player2.getPlayerId(), player2.getPlayerId());
        play.addPlie(plie);
        
        actions = [
            new Action('',getCopyCard(types.clubs, 7)),
            new Action('',getCopyCard(types.clubs, 12)),
            new Action('',getCopyCard(types.spades, 12)),
            new Action('',getCopyCard(types.hearts, 8)),
        ]
        plie = new Plie(5, atout, actions, 1, player3.getPlayerId(), player1.getPlayerId());
        play.addPlie(plie);
        
        actions = [
            new Action('',getCopyCard(types.clubs, 10)),
            new Action('',getCopyCard(types.spades, 13)),
            new Action('',getCopyCard(types.spades, 9)),
            new Action('',getCopyCard(types.clubs, 9)),
        ]
        plie = new Plie(6, atout, actions, 0, player3.getPlayerId(), player2.getPlayerId());
        play.addPlie(plie);
        
        actions = [
            new Action('',getCopyCard(types.clubs, 8)),
            new Action('',getCopyCard(types.hearts, 12)),
            new Action('',getCopyCard(types.hearts, 9)),
            new Action('',getCopyCard(types.hearts, 10)),
        ]
        plie = new Plie(7, atout, actions, 0, player3.getPlayerId(), player2.getPlayerId());
        play.addPlie(plie);
        
        actions = [
            new Action('',getCopyCard(types.spades, 10)),
            new Action('',getCopyCard(types.spades, 14)),
            new Action('',getCopyCard(types.hearts, 11)),
            new Action('',getCopyCard(types.spades, 8)),
        ]
        plie = new Plie(8, atout, actions, 1, player4.getPlayerId(), player2.getPlayerId());
        play.addPlie(plie);

        actions = [
            new Action('',getCopyCard(types.hearts, 14)),
            new Action('',getCopyCard(types.diamonds, 14)),
            new Action('',getCopyCard(types.spades, 11)),
            new Action('',getCopyCard(types.hearts, 13)),
        ]
        plie = new Plie(9, atout, actions, 1, player1.getPlayerId(), player3.getPlayerId());
        play.addPlie(plie);
        
        const resultA = play.calculatePointsTeam(teamA);
        const resultB = play.calculatePointsTeam(teamB);

        expect(resultA).toBe(119);
        expect(resultB).toBe(157-resultA);

    });

    it('should not give 100 bonus when a team got 157pts but not all the plies', ()=>{
        atout = types.clubs;
        let play = new Play([], atout);
        let actions = [
            new Action('',getCopyCard(types.spades, 14)),
            new Action('',getCopyCard(types.spades, 12)),
            new Action('',getCopyCard(types.spades, 11)),
            new Action('',getCopyCard(types.spades, 13)),     
        ];
        let plie = new Plie(1, atout, actions, 0, player1.getPlayerId(), player4.getPlayerId());
        play.addPlie(plie);
        
        actions = [
            new Action('',getCopyCard(types.hearts, 6)),
            new Action('',getCopyCard(types.diamonds, 13)),
            new Action('',getCopyCard(types.hearts, 14)),
            new Action('',getCopyCard(types.hearts, 10)),     
        ]
        plie = new Plie(2, atout, actions, 2, player3.getPlayerId(), player4.getPlayerId());
        play.addPlie(plie);
        
        actions = [
            new Action('',getCopyCard(types.hearts, 12)),
            new Action('',getCopyCard(types.hearts, 7)),
            new Action('',getCopyCard(types.hearts, 13)),
            new Action('',getCopyCard(types.diamonds, 10)),     
        ]
        plie = new Plie(3, atout, actions, 2, player1.getPlayerId(), player2.getPlayerId());
        play.addPlie(plie);
        
        actions = [
            new Action('',getCopyCard(types.spades, 6)),
            new Action('',getCopyCard(types.spades, 7)),
            new Action('',getCopyCard(types.hearts, 8)),
            new Action('',getCopyCard(types.spades, 8)),     
        ]
        plie = new Plie(4, atout, actions, 3, player4.getPlayerId(), player4.getPlayerId());
        play.addPlie(plie);
        
        actions = [
            new Action('',getCopyCard(types.clubs, 14)),
            new Action('',getCopyCard(types.diamonds, 7)),
            new Action('',getCopyCard(types.clubs, 13)),
            new Action('',getCopyCard(types.clubs, 11)),     
        ]
        plie = new Plie(5, atout, actions, 3, player3.getPlayerId(), player3.getPlayerId());
        play.addPlie(plie);
        
        actions = [
            new Action('',getCopyCard(types.clubs, 9)),
            new Action('',getCopyCard(types.clubs, 12)),
            new Action('',getCopyCard(types.spades, 9)),
            new Action('',getCopyCard(types.clubs, 8)),     
        ]
        plie = new Plie(6, atout, actions, 0, player3.getPlayerId(), player2.getPlayerId());
        play.addPlie(plie);
        
        actions = [
            new Action('',getCopyCard(types.clubs, 10)),
            new Action('',getCopyCard(types.diamonds, 14)),
            new Action('',getCopyCard(types.diamonds, 9)),
            new Action('',getCopyCard(types.clubs, 7)),     
        ]
        plie = new Plie(7, atout, actions, 0, player3.getPlayerId(), player2.getPlayerId());
        play.addPlie(plie);
        
        actions = [
            new Action('',getCopyCard(types.hearts, 11)),
            new Action('',getCopyCard(types.diamonds, 12)),
            new Action('',getCopyCard(types.hearts, 9)),
            new Action('',getCopyCard(types.spades, 10)),     
        ]
        plie = new Plie(8, atout, actions, 0, player3.getPlayerId(), player2.getPlayerId());
        play.addPlie(plie);

        actions = [
            new Action('',getCopyCard(types.clubs, 6)),
            new Action('',getCopyCard(types.diamonds, 11)),
            new Action('',getCopyCard(types.diamonds, 8)),
            new Action('',getCopyCard(types.diamonds, 6)),     
        ]
        plie = new Plie(9, atout, actions, 0, player3.getPlayerId(), player2.getPlayerId());
        play.addPlie(plie);
            
        const resultA = play.calculatePointsTeam(teamA);
        const resultB = play.calculatePointsTeam(teamB);
        
        expect(resultA).toBe(157);
        expect(resultB).toBe(0);
    })

});
