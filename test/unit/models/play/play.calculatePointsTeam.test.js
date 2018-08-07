const {types, getCopyCard} = require('../../../../db/lstCards');
const {Play} = require('../../../../models/play');
const {Plie} = require('../../../../models/plie');
const {Team} = require('../../../../models/team');
const {Player} = require('../../../../models/player');

describe("calculatePointsTeam", ()=>{

    it('should return 257 points for one team and 0 for the other one when a team gets all the plies', ()=>{
        let play = new Play({
            plies: [
                new Plie({
                    number: 1,
                    highestCardIndex: 0,
                    leadingPlayer: "77bd-4E1AQ7s8uBKAAAF",
                    lastPlayer: "OXjuG7o8cqu6b8DDAAAE",
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
                    leadingPlayer: "77bd-4E1AQ7s8uBKAAAF",
                    lastPlayer: "OXjuG7o8cqu6b8DDAAAE",
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
                    leadingPlayer: "77bd-4E1AQ7s8uBKAAAF",
                    lastPlayer: "OXjuG7o8cqu6b8DDAAAE",
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
                    leadingPlayer: "77bd-4E1AQ7s8uBKAAAF",
                    lastPlayer: "OXjuG7o8cqu6b8DDAAAE",
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
                    leadingPlayer: "77bd-4E1AQ7s8uBKAAAF",
                    lastPlayer: "OXjuG7o8cqu6b8DDAAAE",
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
                    leadingPlayer: "77bd-4E1AQ7s8uBKAAAF",
                    lastPlayer: "OXjuG7o8cqu6b8DDAAAE",
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
                    leadingPlayer: "77bd-4E1AQ7s8uBKAAAF",
                    lastPlayer: "OXjuG7o8cqu6b8DDAAAE",
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
                    leadingPlayer: "_ilsUvWO4jA5-1-fAAAH",
                    lastPlayer: "OXjuG7o8cqu6b8DDAAAE",
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
                    leadingPlayer: "77bd-4E1AQ7s8uBKAAAF",
                    lastPlayer: "3yhkUDmo1sNULXDbAAAG",
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

        let teamA = new Team({            
            players: [
                new Player({id: "77bd-4E1AQ7s8uBKAAAF"}),
                new Player({id: "_ilsUvWO4jA5-1-fAAAH"})
            ]
        });
        let teamB = new Team({            
            players: [
                new Player({id: "OXjuG7o8cqu6b8DDAAAE"}),
                new Player({id: "3yhkUDmo1sNULXDbAAAG"})
            ]
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
                    leadingPlayer: "gz4hbKKsldlBLuTfAAAE",
                    lastPlayer: "SlQLwX1nutgmkWtcAAAH",
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
                    leadingPlayer: "F2nYgjEin7a0P6siAAAG",
                    lastPlayer: "SlQLwX1nutgmkWtcAAAH",
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
                    leadingPlayer: "F2nYgjEin7a0P6siAAAG",
                    lastPlayer: "xZ1gUrYlVSjvrk11AAAF",
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
                    leadingPlayer: "xZ1gUrYlVSjvrk11AAAF",
                    lastPlayer: "xZ1gUrYlVSjvrk11AAAF",
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
                    leadingPlayer: "F2nYgjEin7a0P6siAAAG",
                    lastPlayer: "gz4hbKKsldlBLuTfAAAE",
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
                    leadingPlayer: "F2nYgjEin7a0P6siAAAG",
                    lastPlayer: "xZ1gUrYlVSjvrk11AAAF",
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
                    leadingPlayer: "F2nYgjEin7a0P6siAAAG",
                    lastPlayer: "xZ1gUrYlVSjvrk11AAAF",
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
                    leadingPlayer: "SlQLwX1nutgmkWtcAAAH",
                    lastPlayer: "xZ1gUrYlVSjvrk11AAAF",
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
                    leadingPlayer: "gz4hbKKsldlBLuTfAAAE",
                    lastPlayer: "F2nYgjEin7a0P6siAAAG",
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

        let teamA = new Team({
            players: [
                new Player({id: "gz4hbKKsldlBLuTfAAAE"}),
                new Player({id: "F2nYgjEin7a0P6siAAAG"}),
            ]
        });

        let teamB = new Team({
            players: [
                new Player({id: "xZ1gUrYlVSjvrk11AAAF"}),
                new Player({id: "SlQLwX1nutgmkWtcAAAH"}),
            ]
        })

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
                    leadingPlayer: "x4LiglF-N7CyE88YAAAE",
                    lastPlayer: "JqCMSBFi-tITqBzxAAAH",
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
                    leadingPlayer: "xe0limtopblzSBglAAAG",
                    lastPlayer: "JqCMSBFi-tITqBzxAAAH",
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
                    leadingPlayer: "x4LiglF-N7CyE88YAAAE",
                    lastPlayer: "Gl_ZFaeHllOocQpSAAAF",
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
                    leadingPlayer: "JqCMSBFi-tITqBzxAAAH",
                    lastPlayer: "JqCMSBFi-tITqBzxAAAH",
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
                    leadingPlayer: "xe0limtopblzSBglAAAG",
                    lastPlayer: "xe0limtopblzSBglAAAG",
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
                    leadingPlayer: "xe0limtopblzSBglAAAG",
                    lastPlayer: "Gl_ZFaeHllOocQpSAAAF",
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
                    leadingPlayer: "xe0limtopblzSBglAAAG",
                    lastPlayer: "Gl_ZFaeHllOocQpSAAAF",
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
                    leadingPlayer: "xe0limtopblzSBglAAAG",
                    lastPlayer: "Gl_ZFaeHllOocQpSAAAF",
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
                    leadingPlayer: "xe0limtopblzSBglAAAG",
                    lastPlayer: "Gl_ZFaeHllOocQpSAAAF",
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
    
        let teamA = new Team({
            players: [
                new Player({id: "x4LiglF-N7CyE88YAAAE"}),
                new Player({id: "xe0limtopblzSBglAAAG"})
            ]
        });
        
        let teamB = new Team({
            players: [
                new Player({id: "Gl_ZFaeHllOocQpSAAAF"}),
                new Player({id: "JqCMSBFi-tITqBzxAAAH"})
            ]
        });
    
        const resultA = play.calculatePointsTeam(teamA);
        const resultB = play.calculatePointsTeam(teamB);
        
        expect(resultA).toBe(157);
        expect(resultB).toBe(0);
    })

});
