const {Plie} = require('../../../../models/plie');
const {Card} = require('../../../../models/card');
const {types, getCopyCard} = require('../../../../db/lstCards');


describe('plie.calculatePoints', ()=>{
    atout = types.clubs;

    it('Should return 0 if there are only cards below 9 and it is not the last plie', ()=>{
        let plie = new Plie(1, atout);
        plie.addCardPlayed(getCopyCard(types.diamonds, 7), '', '');
        plie.addCardPlayed(getCopyCard(types.spades, 8), '', '');
        plie.addCardPlayed(getCopyCard(types.spades, 6), '', '');
        plie.addCardPlayed(getCopyCard(types.spades, 7), '', '');
        const points = plie.calculatePliePoints(atout);
        expect(points).toBe(0);        
    });

    it('Should return 5 if there is 0 points and it is the last plie', ()=>{
        let plie = new Plie(9, atout);
        plie.addCardPlayed(getCopyCard(types.diamonds, 7), '', '');
        plie.addCardPlayed(getCopyCard(types.diamonds, 8), '', '');
        plie.addCardPlayed(getCopyCard(types.diamonds, 6), '', '');
        plie.addCardPlayed(getCopyCard(types.clubs, 7), '', '');
        const points = plie.calculatePliePoints(atout);
        expect(points).toBe(5);        
    });
    it('Should use the atout value if the card is an atout', ()=>{
        let plie = new Plie(1, atout);
        plie.addCardPlayed(getCopyCard(types.clubs, 7), '', '');
        plie.addCardPlayed(getCopyCard(types.clubs, 8), '', '');
        plie.addCardPlayed(getCopyCard(types.clubs, 9), '', '');
        plie.addCardPlayed(getCopyCard(types.clubs, 11), '', '');
        const points = plie.calculatePliePoints(atout);
        expect(points).toBe(34);        
    });
});
