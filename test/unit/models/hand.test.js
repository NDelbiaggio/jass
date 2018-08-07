const {Player} = require('../../../models/player');
const {Card} = require('../../../models/card');
const {Plie} = require('../../../models/plie');
const {isCardPlayable} = require('../../../communication/rules/cardPlayable');
const {types, getCopyCard} = require('../../../db/lstCards');

describe('hand.addCardPlayed', ()=>{
    let atout;
    let card
    let plie;

    beforeEach(function(){
        atout = types.clubs;
    });
    

    function exec (cardsPlie, cardsHand){
        plie = new Plie({
            cards: cardsPlie,
            highestCardIndex: cardsPlie.length -1
        });

        return isCardPlayable(card, atout, plie, cardsHand);
    }

    it('should return true if we play the first card',()=>{
        card = getCopyCard(types.diamonds, 7);
        const result = exec([],[]);
        expect(result).toBe(true);
    });

    it('should return true if we play the same kind as the first card played', ()=>{
        card = getCopyCard(types.diamonds, 7);
        const cardsPlie = [
            getCopyCard(types.diamonds, 11)
        ];
        const result = exec(cardsPlie,[]);
        expect(result).toBe(true);
    });

    describe('play atout (cut, overcut, undercut)', ()=>{
        it('should return true if we cut a pile uncut', ()=>{
            card = getCopyCard(atout, 7);
            const cardsPlie = [
                getCopyCard(types.diamonds, 11)
            ]
            const result = exec(cardsPlie, []);    
            expect(result).toBe(true);
        });
    
        it('should return true if we overcut', ()=>{
            card = getCopyCard(atout, 14);
            const cardsPlie = [
                getCopyCard(types.diamonds, 11),
                getCopyCard(types.clubs, 7)
            ];            
            const result = exec(cardsPlie, []);    
            expect(result).toBe(true);
        });
    
        describe('undercut', ()=>{
            it('should return false if we undercut when there is an other option', ()=>{
                card = getCopyCard(atout, 6);
                const cardsPlie = [
                    getCopyCard(types.diamonds, 11),
                    getCopyCard(atout, 7)
                ];
                const cardsHand = [
                    getCopyCard(types.diamonds, 8)
                ];
                const result = exec(cardsPlie, cardsHand);                
                expect(result).toBe(false);
            });
        
            it('should return false if it is undercut and overcut is possible', ()=>{
                card = getCopyCard(atout, 6)
                const cardsPlie = [
                    getCopyCard(types.diamonds, 11),
                    getCopyCard(atout, 7)
                ];
                const cardsHand = [
                    getCopyCard(types.clubs, 10)
                ];        
                const result = exec(cardsPlie, cardsHand);
                expect(result).toBe(false);        
            });
        
            it('should return true if it is undercut and there is no other choice', ()=>{
                card = getCopyCard(atout, 6)
                const cardsPlie = [
                    getCopyCard(types.diamonds, 11),
                    getCopyCard(atout, 14)
                ];
                const cardsHand = [
                    getCopyCard(types.clubs, 10)
                ];        
                const result = exec(cardsPlie, cardsHand);
                expect(result).toBe(true);        
            });
        
            it('should return true if it is undercut with the bauer in hand', ()=>{
                card = getCopyCard(atout, 6);
                const cardsPlie = [
                    getCopyCard(types.diamonds, 11),
                    getCopyCard(atout, 7)
                ];
                const cardsHand = [
                    getCopyCard(atout, 11)
                ];                        
                const result = exec(cardsPlie, cardsHand);
                expect(result).toBe(true);  
            });
        });
    });

    it('should return false if asked: atout, atout in hand that is not the bauer and atout not played', ()=>{
        card = getCopyCard(types.diamonds, 11);
        const cardsPlie = [
            getCopyCard(atout, 6)
        ];
        const cardsHand = [
            getCopyCard(atout, 7)
        ];
        const result = exec(cardsPlie, cardsHand);
        expect(result).toBe(false);  
    });

    it('should return false if asked: not atout, asked type available in hand, but not played and atout not played', ()=>{
        card = getCopyCard(types.diamonds, 11);
        const cardsPlie = [
            getCopyCard(types.hearts, 9)
        ];        
        const cardsHand = [
            getCopyCard(types.hearts, 7)
        ];
        const result = exec(cardsPlie, cardsHand);
        expect(result).toBe(false);  
    });

    it('should return true if based type is not played and not in hand', ()=>{
        card = getCopyCard(types.diamonds, 8);
        const cardsPlie = [
            getCopyCard(types.hearts, 7)
        ];
        const cardsHand = [
            getCopyCard(types.diamonds, 10)
        ];
        const result = exec(cardsPlie, cardsHand);
        expect(result).toBe(true);          
    });

    it('should return true if based type is atout, but not played because not available', ()=>{
        card = getCopyCard(types.diamonds, 10);
        const cardsPlie = [
            getCopyCard(types.clubs, 10)
        ];        
        const cardsHand = [
            getCopyCard(types.diamonds, 11)
        ];
        const result = exec(cardsPlie, cardsHand);
        expect(result).toBe(true);   
    });

    it('should return true ', ()=>{
        card = getCopyCard(types.hearts, 6);
        
        const cardsPlie = [
            getCopyCard(atout, 13),
            getCopyCard(atout, 9),
        ];
        
        const cardsHand = [
            getCopyCard(types.diamonds, 14),
            getCopyCard(types.hearts, 7),
            getCopyCard(types.hearts, 10),
            getCopyCard(types.hearts, 14),
            getCopyCard(types.spades, 10),
            getCopyCard(types.spades, 11),
            getCopyCard(types.spades, 14),
        ];


        const result = exec(cardsPlie, cardsHand);
        expect(result).toBe(true);  
    });
});
