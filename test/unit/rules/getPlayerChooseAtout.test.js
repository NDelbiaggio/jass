const {Player} = require('../../../models/player');
const {Play} = require('../../../models/play');
const {Plie} = require('../../../models/plie');

const {types, getCopyCard} = require('../../../db/lstCards');
const {getPlayerToChooseAtout} = require('../../../communication/notifiers/notifyToChoseAtout');

describe('getPlayerToChooseAtout', ()=>{
    let players = [
        new Player({
            id: "KVpSm71lq3E_XxeFAAAE",
            cards: [
                getCopyCard(types.clubs, 9),
                getCopyCard(types.hearts, 10),
                getCopyCard(types.spades, 9),
                getCopyCard(types.hearts, 14),
                getCopyCard(types.spades, 12),
                getCopyCard(types.diamonds, 13),
                getCopyCard(types.hearts, 6),
                getCopyCard(types.clubs, 10),
                getCopyCard(types.spades, 10),         
            ]
        }),
        new Player({
            id: "BhVTrTIbLBzGDE7KAAAF",
            cards: [
                getCopyCard(types.diamonds, 10),
                getCopyCard(types.hearts, 8),
                getCopyCard(types.diamonds, 8),
                getCopyCard(types.spades, 6),
                getCopyCard(types.hearts, 7),
                getCopyCard(types.clubs, 7),
                getCopyCard(types.diamonds, 7),
                getCopyCard(types.spades, 7),
                getCopyCard(types.spades, 13),         
            ]
        }),
        new Player({
            id: "4rotuBeiIIBP0aDVAAAG",
            cards: [
                getCopyCard(types.hearts, 11),
                getCopyCard(types.diamonds, 11),
                getCopyCard(types.spades, 8),
                getCopyCard(types.spades, 14),
                getCopyCard(types.diamonds, 6),
                getCopyCard(types.diamonds, 9),
                getCopyCard(types.diamonds, 12),
                getCopyCard(types.clubs, 13),
                getCopyCard(types.diamonds, 14),         
            ]
        }),
        new Player({
            id: "tqZPcCIxg51pZBnCAAAH",
            cards: [
                getCopyCard(types.hearts, 9),
                getCopyCard(types.clubs, 6),
                getCopyCard(types.clubs, 11),
                getCopyCard(types.clubs, 14),
                getCopyCard(types.hearts, 12),
                getCopyCard(types.clubs, 12),
                getCopyCard(types.clubs, 8),
                getCopyCard(types.spades, 11),
                getCopyCard(types.hearts, 13),         
            ]
        })
    ]

    it("Should return the player who has the 7 of diamonds if it is the first play of the gmae",()=>{
        let play = new Play();
                
        const result = getPlayerToChooseAtout(players, play);

        expect(result).toBe(players[1]);
    });

    it("Should return the player index 3 if the player index 2 did atout previously", ()=>{
        let play = new Play({atoutChosenBy: players[2]._id});

        const result = getPlayerToChooseAtout(players, play);

        expect(result).toBe(players[3]);
    });

    it("Should return the player index 0 if the player index 3 did atout previously", ()=>{
        let play = new Play({atoutChosenBy: players[3]._id});

        const result = getPlayerToChooseAtout(players, play);

        expect(result).toBe(players[0]);
    });


});