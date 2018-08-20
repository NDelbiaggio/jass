const {Trick} = require('../../../../models/trick');
const {Card} = require('../../../../models/card');
const {types, getCopyCard} = require('../../../../db/deck');

describe('trick.isCardHigher', ()=>{
    const trump = types.diamonds;
    it('should not change the highest if the leading card is trump and the new card not', ()=>{        
        const leadingCard = new Card({type: types.diamonds});
        const card = new Card({type: types.spades});
        const trick = new Trick(1, trump);        
        trick.addCardPlayed(leadingCard, '', '');
        trick.addCardPlayed(card, '', '');
        expect(trick.highestCardIndex).toBe(0);
    });
    it('should change the highest card if the leading card is not trump and the new card is trump', ()=>{        
        const leadingCard = getCopyCard(types.spades, 6);
        const card = getCopyCard(types.diamonds, 6);;
        const trick = new Trick(1, trump);        
        trick.addCardPlayed(leadingCard);
        trick.addCardPlayed(card);
        expect(trick.highestCardIndex).toBe(1);
    });    
    it('should not change the highestCard if both are not trump and card is lower than the current', ()=>{        
        const leadingCard = getCopyCard(types.spades, 14);
        const card = getCopyCard(types.spades, 6);;
        const trick = new Trick(1, trump);        
        trick.addCardPlayed(leadingCard);
        trick.addCardPlayed(card);
        expect(trick.highestCardIndex).toBe(0);
    });
    it('should change the highestCard if both are trump and card is higher than the current', ()=>{        
        const leadingCard = getCopyCard(types.diamonds, 6);
        const card = getCopyCard(types.diamonds, 14);;
        const trick = new Trick(1, trump);        
        trick.addCardPlayed(leadingCard);
        trick.addCardPlayed(card);
        expect(trick.highestCardIndex).toBe(1);
    });
    it('should not change the highestCard if both are trump and card is lower than the current', ()=>{        
        const firstCard = getCopyCard(types.diamonds, 6);
        const leadingCard = getCopyCard(types.diamonds, 14);
        const card = getCopyCard(types.diamonds, 7);;
        const trick = new Trick(1, trump);        
        trick.addCardPlayed(firstCard);
        trick.addCardPlayed(leadingCard);
        trick.addCardPlayed(card);
        expect(trick.highestCardIndex).toBe(1);
    });
    it('should set highestScoreInd to 0 if it is the first card', ()=>{        
        const card = getCopyCard(types.diamonds, 6);
        const trick = new Trick(1, trump);    
        trick.addCardPlayed(card);
        expect(trick.highestCardIndex).toBe(0);
    });

    it('should define the highest card based on the type of the first card and the highest power when no trump is played', ()=>{
        const trick = new Trick(1, trump);
        trick.addCardPlayed(getCopyCard(types.clubs, 9))
        trick.addCardPlayed(getCopyCard(types.spades, 8))
        trick.addCardPlayed(getCopyCard(types.clubs, 11))
        trick.addCardPlayed(getCopyCard(types.spades, 12))
        
        expect(trick.highestCardIndex).toBe(2)
       
    })
});