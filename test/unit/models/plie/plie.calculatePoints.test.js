const {Plie} = require('../../../../models/plie');
const {Card} = require('../../../../models/card');
const {types, getCopyCard} = require('../../../../db/lstCards');


describe('plie.calculatePoints', ()=>{
    it('Should return 0 if there are only cards below 9 and it is not the last plie', ()=>{
        let plie = new Plie({number: 1 });
        plie.addCardPlayed(types.spades,new Card({type: types.diamonds,name: 'seven', power: 7, atoutValue: 0, value: 0}),)
        plie.addCardPlayed(types.spades,new Card({type: types.diamonds,name: 'eight', power: 8, atoutValue: 0, value: 0}),)
        plie.addCardPlayed(types.spades,new Card({type: types.diamonds,name: 'six', power: 6, atoutValue: 0, value: 0}),)
        plie.addCardPlayed(types.spades,new Card({type: types.clubs,name: 'seven', power: 7, atoutValue: 0, value: 0}),)
        const points = plie.calculatePliePoints(types.clubs);
        expect(points).toBe(0);        
    });

    it('Should return 5 if there is 0 points and it is the last plie', ()=>{
        let plie = new Plie({number: 9 });
        plie.addCardPlayed(types.spades,new Card({type: types.diamonds,name: 'seven', power: 7, atoutValue: 0, value: 0}),)
        plie.addCardPlayed(types.spades,new Card({type: types.diamonds,name: 'eight', power: 8, atoutValue: 0, value: 0}),)
        plie.addCardPlayed(types.spades,new Card({type: types.diamonds,name: 'six', power: 6, atoutValue: 0, value: 0}),)
        plie.addCardPlayed(types.spades,new Card({type: types.clubs,name: 'seven', power: 7, atoutValue: 0, value: 0}),)
        const points = plie.calculatePliePoints(types.clubs);
        expect(points).toBe(5);        
    });
    it('Should use the atout value if the card is an atout', ()=>{
        let plie = new Plie({number: 1 });
        plie.addCardPlayed(types.spades,new Card({type: types.clubs,name: 'seven', power: 7, atoutValue: 0, value: 0}),)
        plie.addCardPlayed(types.spades,new Card({type: types.clubs,name: 'eight', power: 8, atoutValue: 0, value: 0}),)
        plie.addCardPlayed(types.spades,new Card({type: types.clubs,name: 'nine', power: 9, atoutValue: 14, value: 0}),)
        plie.addCardPlayed(types.spades,new Card({type: types.clubs,name: 'vale', power: 11, atoutValue: 20, value: 2}),)
        const points = plie.calculatePliePoints(types.clubs);
        expect(points).toBe(34);        
    });
});
