const {Trick} = require('../../../../models/trick');
const {Card} = require('../../../../models/card');
const {types, getCopyCard} = require('../../../../db/deck');


describe('trick.calculatePoints', ()=>{
    let trump = types.clubs;

    it('Should return 0 if there are only cards below 9 and it is not the last trick', ()=>{
        let trick = new Trick(1, trump);
        trick.addCardPlayed(getCopyCard(types.diamonds, 7), '', '');
        trick.addCardPlayed(getCopyCard(types.spades, 8), '', '');
        trick.addCardPlayed(getCopyCard(types.spades, 6), '', '');
        trick.addCardPlayed(getCopyCard(types.spades, 7), '', '');
        const points = trick.calculateTrickPoints(trump);
        expect(points).toBe(0);        
    });

    it('Should return 5 if there is 0 points and it is the last trick', ()=>{
        let trick = new Trick(9, trump);
        trick.addCardPlayed(getCopyCard(types.diamonds, 7), '', '');
        trick.addCardPlayed(getCopyCard(types.diamonds, 8), '', '');
        trick.addCardPlayed(getCopyCard(types.diamonds, 6), '', '');
        trick.addCardPlayed(getCopyCard(types.clubs, 7), '', '');
        const points = trick.calculateTrickPoints(trump);
        expect(points).toBe(5);        
    });
    it('Should use the trump value if the card is an trump', ()=>{
        let trick = new Trick(1, trump);
        trick.addCardPlayed(getCopyCard(types.clubs, 7), '', '');
        trick.addCardPlayed(getCopyCard(types.clubs, 8), '', '');
        trick.addCardPlayed(getCopyCard(types.clubs, 9), '', '');
        trick.addCardPlayed(getCopyCard(types.clubs, 11), '', '');
        const points = trick.calculateTrickPoints(trump);
        expect(points).toBe(34);        
    });
});
