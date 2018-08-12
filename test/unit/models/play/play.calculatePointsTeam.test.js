const {types, getCopyCard} = require('../../../../db/lstCards');
const {Play} = require('../../../../models/play');
const {Plie} = require('../../../../models/plie');
const {Team} = require('../../../../models/team');
const {Player} = require('../../../../models/player');
const mongoose = require('mongoose');

describe("play.calculatePointsTeam", ()=>{
    let player1 = mongoose.Types.ObjectId();
    let player2 = mongoose.Types.ObjectId();
    let player3 = mongoose.Types.ObjectId();
    let player4 = mongoose.Types.ObjectId();
    
    let teamA = new Team({            
        players: [
            new Player({_id: player1}),
            new Player({_id: player3})
        ]
    });
    let teamB = new Team({            
        players: [
            new Player({_id: player2}),
            new Player({_id: player4})
        ]
    });


    it('should return 257 points for one team and 0 for the other one when a team gets all the plies', ()=>{
        let play = new Play({
            plies: [
                new Plie({
                    number: 1,
                    highestCardIndex: 0,
                    leadingPlayer: player1,
                    lastPlayer: player2,
                    cards: [
                        getCopyCard(types.diamonds, 11),
                        getCopyCard(types.diamonds, 6),
                        getCopyCard(types.diamonds, 14),
                        getCopyCard(types.spades, 13),                        
                    ]
                }),
            new Plie({
                    number: 2,
                    highestCardIndex: 0,
                    leadingPlayer: player1,
                    lastPlayer: player2,
                    cards: [
                        getCopyCard(types.diamonds, 9),
                        getCopyCard(types.diamonds, 12),
                        getCopyCard(types.spades, 7),
                        getCopyCard(types.spades, 11)                        
                    ]
                }),
            new Plie({
                    number: 3,
                    highestCardIndex: 0,
                    leadingPlayer: player1,
                    lastPlayer: player2,
                    cards: [
                        getCopyCard(types.hearts, 13),
                        getCopyCard(types.hearts, 9),
                        getCopyCard(types.hearts, 10),
                        getCopyCard(types.hearts, 6),
                    ]
                }),
            new Plie({
                    number: 4,
                    highestCardIndex: 0,
                    leadingPlayer: player1,
                    lastPlayer: player2,
                    cards: [
                        getCopyCard(types.diamonds, 7),
                        getCopyCard(types.hearts, 14),
                        getCopyCard(types.clubs, 6),
                        getCopyCard(types.clubs, 12),
                    ]
                }),
            new Plie({
                    number: 5,
                    highestCardIndex: 0,
                    leadingPlayer: player1,
                    lastPlayer: player2,
                    cards: [
                        getCopyCard(types.diamonds, 8),
                        getCopyCard(types.clubs, 14),
                        getCopyCard(types.clubs, 7),
                        getCopyCard(types.clubs, 10),                        
                    ]
                }),
            new Plie({
                    number: 6,
                    highestCardIndex: 0,
                    leadingPlayer: player1,
                    lastPlayer: player2,
                    cards: [
                        getCopyCard(types.diamonds, 10),
                        getCopyCard(types.spades, 14),
                        getCopyCard(types.clubs, 8),
                        getCopyCard(types.hearts, 7),                        
                    ]
                }),
            new Plie({
                    number: 7,
                    highestCardIndex: 0,
                    leadingPlayer: player1,
                    lastPlayer: player2,
                    cards: [
                        getCopyCard(types.diamonds, 13),
                        getCopyCard(types.clubs, 13),
                        getCopyCard(types.hearts, 12),
                        getCopyCard(types.hearts, 8),                       
                    ]
                }),
            new Plie({
                    number: 8,
                    highestCardIndex: 2,
                    leadingPlayer: player3,
                    lastPlayer: player2,
                    cards: [
                        getCopyCard(types.spades, 10),
                        getCopyCard(types.spades, 6),
                        getCopyCard(types.hearts, 11),
                        getCopyCard(types.spades, 9),                        
                    ]
                }),
            new Plie({
                    number: 9,
                    highestCardIndex: 3,
                    leadingPlayer: player1,
                    lastPlayer: player4,
                    cards: [
                        getCopyCard(types.clubs, 9),
                        getCopyCard(types.spades, 8),
                        getCopyCard(types.clubs, 11),
                        getCopyCard(types.spades, 12),
                    ]
                }),
            
            ],
            atout: types.diamonds
        });

        const resultA = play.calculatePointsTeam(teamA);
        const resultB = play.calculatePointsTeam(teamB);

        expect(resultA).toBe(257);
        expect(resultB).toBe(0);
    });

    it('should the sum of the two teams points has to be equal to 157 if both teams have at least one plie', ()=>{
        const play = new Play({
            plies: [
                new Plie({
                    number: 1,
                    highestCardIndex: "0",
                    leadingPlayer: player1,
                    lastPlayer: player4,
                    cards: [
                        getCopyCard(types.diamonds, 11),
                        getCopyCard(types.diamonds, 6),
                        getCopyCard(types.diamonds, 12),
                        getCopyCard(types.diamonds, 8),    
                    ]
                }),
            new Plie({
                    number: 2,
                    highestCardIndex: "2",
                    leadingPlayer: player3,
                    lastPlayer: player4,
                    cards: [
                        getCopyCard(types.diamonds, 7),
                        getCopyCard(types.spades, 6),
                        getCopyCard(types.diamonds, 13),
                        getCopyCard(types.hearts, 6),    
                    ]
                }),
            new Plie({
                    number: 3,
                    highestCardIndex: "0",
                    leadingPlayer: player3,
                    lastPlayer: player2,
                    cards: [
                        getCopyCard(types.diamonds, 9),
                        getCopyCard(types.clubs, 11),
                        getCopyCard(types.diamonds, 10),
                        getCopyCard(types.hearts, 7),    
                    ]
                }),
            new Plie({
                    number: 4,
                    highestCardIndex: "3",
                    leadingPlayer: player2,
                    lastPlayer: player2,
                    cards: [
                        getCopyCard(types.clubs, 6),
                        getCopyCard(types.spades, 7),
                        getCopyCard(types.clubs, 13),
                        getCopyCard(types.clubs, 14),    
                    ]
                }),
            new Plie({
                    number: 5,
                    highestCardIndex: "1",
                    leadingPlayer: player3,
                    lastPlayer: player1,
                    cards: [
                        getCopyCard(types.clubs, 7),
                        getCopyCard(types.clubs, 12),
                        getCopyCard(types.spades, 12),
                        getCopyCard(types.hearts, 8),    
                    ]
                }),
            new Plie({
                    number: 6,
                    highestCardIndex: "0",
                    leadingPlayer: player3,
                    lastPlayer: player2,
                    cards: [
                        getCopyCard(types.clubs, 10),
                        getCopyCard(types.spades, 13),
                        getCopyCard(types.spades, 9),
                        getCopyCard(types.clubs, 9),    
                    ]
                }),
            new Plie({
                    number: 7,
                    highestCardIndex: "0",
                    leadingPlayer: player3,
                    lastPlayer: player2,
                    cards: [
                        getCopyCard(types.clubs, 8),
                        getCopyCard(types.hearts, 12),
                        getCopyCard(types.hearts, 9),
                        getCopyCard(types.hearts, 10),    
                    ]
                }),
            new Plie({
                    number: 8,
                    highestCardIndex: "1",
                    leadingPlayer: player4,
                    lastPlayer: player2,
                    cards: [
                        getCopyCard(types.spades, 10),
                        getCopyCard(types.spades, 14),
                        getCopyCard(types.hearts, 11),
                        getCopyCard(types.spades, 8),    
                    ]
                }),
            new Plie({
                    number: 9,
                    highestCardIndex: "1",
                    leadingPlayer: player1,
                    lastPlayer: player3,
                    cards: [
                        getCopyCard(types.hearts, 14),
                        getCopyCard(types.diamonds, 14),
                        getCopyCard(types.spades, 11),
                        getCopyCard(types.hearts, 13),    
                    ]
                }),
            ],
            atout: types.diamonds
        });

        const resultA = play.calculatePointsTeam(teamA);
        const resultB = play.calculatePointsTeam(teamB);

        expect(resultA).toBe(119);
        expect(resultB).toBe(157-resultA);

    });

    it('should not give 100 bonus when a team got 157pts but not all the plies', ()=>{
        let play = new Play({
            plies: [
                new Plie({
                    number: 1,
                    highestCardIndex: "0",
                    leadingPlayer: player1,
                    lastPlayer: player4,
                    cards: [
                        getCopyCard(types.spades, 14),
                        getCopyCard(types.spades, 12),
                        getCopyCard(types.spades, 11),
                        getCopyCard(types.spades, 13),     
                    ]
                }),
            new Plie({
                    number: 2,
                    highestCardIndex: "2",
                    leadingPlayer: player3,
                    lastPlayer: player4,
                    cards: [
                        getCopyCard(types.hearts, 6),
                        getCopyCard(types.diamonds, 13),
                        getCopyCard(types.hearts, 14),
                        getCopyCard(types.hearts, 10),     
                    ]
                }),
            new Plie({
                    number: 3,
                    highestCardIndex: "2",
                    leadingPlayer: player1,
                    lastPlayer: player2,
                    cards: [
                        getCopyCard(types.hearts, 12),
                        getCopyCard(types.hearts, 7),
                        getCopyCard(types.hearts, 13),
                        getCopyCard(types.diamonds, 10),     
                    ]
                }),
            new Plie({
                    number: 4,
                    highestCardIndex: "3",
                    leadingPlayer: player4,
                    lastPlayer: player4,
                    cards: [
                        getCopyCard(types.spades, 6),
                        getCopyCard(types.spades, 7),
                        getCopyCard(types.hearts, 8),
                        getCopyCard(types.spades, 8),     
                    ]
                }),
            new Plie({
                    number: 5,
                    highestCardIndex: "3",
                    leadingPlayer: player3,
                    lastPlayer: player3,
                    cards: [
                        getCopyCard(types.clubs, 14),
                        getCopyCard(types.diamonds, 7),
                        getCopyCard(types.clubs, 13),
                        getCopyCard(types.clubs, 11),     
                    ]
                }),
            new Plie({
                    number: 6,
                    highestCardIndex: "0",
                    leadingPlayer: player3,
                    lastPlayer: player2,
                    cards: [
                        getCopyCard(types.clubs, 9),
                        getCopyCard(types.clubs, 12),
                        getCopyCard(types.spades, 9),
                        getCopyCard(types.clubs, 8),     
                    ]
                }),
            new Plie({
                    number: 7,
                    highestCardIndex: "0",
                    leadingPlayer: player3,
                    lastPlayer: player2,
                    cards: [
                        getCopyCard(types.clubs, 10),
                        getCopyCard(types.diamonds, 14),
                        getCopyCard(types.diamonds, 9),
                        getCopyCard(types.clubs, 7),     
                    ]
                }),
            new Plie({
                    number: 8,
                    highestCardIndex: "0",
                    leadingPlayer: player3,
                    lastPlayer: player2,
                    cards: [
                        getCopyCard(types.hearts, 11),
                        getCopyCard(types.diamonds, 12),
                        getCopyCard(types.hearts, 9),
                        getCopyCard(types.spades, 10),     
                    ]
                }),
            new Plie({
                    number: 9,
                    highestCardIndex: "0",
                    leadingPlayer: player3,
                    lastPlayer: player2,
                    cards: [
                        getCopyCard(types.clubs, 6),
                        getCopyCard(types.diamonds, 11),
                        getCopyCard(types.diamonds, 8),
                        getCopyCard(types.diamonds, 6),     
                    ]
                }),            
            ],
            atout: types.clubs
        })
    
        const resultA = play.calculatePointsTeam(teamA);
        const resultB = play.calculatePointsTeam(teamB);
        
        expect(resultA).toBe(157);
        expect(resultB).toBe(0);
    })

});
