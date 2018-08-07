const {Plie} = require('../../../../models/plie');
const {Card} = require('../../../../models/card');
const {types, getCopyCard} = require('../../../../db/lstCards');

describe('plie.isCardHigher', ()=>{
    const atout = types.diamonds;
    it('should not change the highest if the leading card is atout and the new card not', ()=>{        
        const leadingCard = new Card({type: types.diamonds});
        const card = new Card({type: types.spades});
        const plie = new Plie({cards: []});        
        plie.addCardPlayed(atout, leadingCard);
        plie.addCardPlayed(atout, card);
        expect(plie.highestCardIndex).toBe(0);
    });
    it('should change the highest card if the leading card is not atout and the new card is atout', ()=>{        
        const leadingCard = getCopyCard(types.spades, 6);
        const card = getCopyCard(types.diamonds, 6);;
        const plie = new Plie({cards: []});        
        plie.addCardPlayed(atout, leadingCard);
        plie.addCardPlayed(atout, card);
        expect(plie.highestCardIndex).toBe(1);
    });    
    it('should not change the highestCard if both are not atout and card is lower than the current', ()=>{        
        const leadingCard = getCopyCard(types.spades, 14);
        const card = getCopyCard(types.spades, 6);;
        const plie = new Plie({cards: []});        
        plie.addCardPlayed(atout, leadingCard);
        plie.addCardPlayed(atout, card);
        expect(plie.highestCardIndex).toBe(0);
    });
    it('should change the highestCard if both are atout and card is higher than the current', ()=>{        
        const leadingCard = getCopyCard(types.diamonds, 6);
        const card = getCopyCard(types.diamonds, 14);;
        const plie = new Plie({cards: []});        
        plie.addCardPlayed(atout, leadingCard);
        plie.addCardPlayed(atout, card);
        expect(plie.highestCardIndex).toBe(1);
    });
    it('should not change the highestCard if both are atout and card is lower than the current', ()=>{        
        const firstCard = getCopyCard(types.diamonds, 6);
        const leadingCard = getCopyCard(types.diamonds, 14);
        const card = getCopyCard(types.diamonds, 7);;
        const plie = new Plie({cards: []});        
        plie.addCardPlayed(atout, firstCard);
        plie.addCardPlayed(atout, leadingCard);
        plie.addCardPlayed(atout, card);
        expect(plie.highestCardIndex).toBe(1);
    });
    it('should set highestScoreInd to 0 if it is the first card', ()=>{        
        const card = getCopyCard(types.diamonds, 6);
        const plie = new Plie({cards: []});    
        plie.addCardPlayed(atout, card);
        expect(plie.highestCardIndex).toBe(0);
    });

    it('should define the highest card based on the type of the first card and the highest power when no atout is played', ()=>{
        const plie = new Plie();
        plie.addCardPlayed(atout,getCopyCard(types.clubs, 9))
        plie.addCardPlayed(atout,getCopyCard(types.spades, 8))
        plie.addCardPlayed(atout,getCopyCard(types.clubs, 11))
        plie.addCardPlayed(atout,getCopyCard(types.spades, 12))
        
        expect(plie.highestCardIndex).toBe(2)
       
    })
});