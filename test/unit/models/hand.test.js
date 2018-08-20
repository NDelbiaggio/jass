const {Player} = require('../../../models/player');
const {Card} = require('../../../models/card');
const {Trick} = require('../../../models/trick');
const {Action} = require('../../../models/action');
const {isCardPlayable} = require('../../../communication/rules/cardPlayable');
const {types, getCopyCard} = require('../../../db/deck');

describe('hand.addCardPlayed', ()=>{
    let trump;
    let card
    let trick;

    beforeEach(function(){
        trump = types.clubs;
    });
    

    function exec (cardsTrick, cardsHand){
        trick = new Trick( null, trump, cardsTrick, cardsTrick.length - 1);

        return isCardPlayable(card, trump, trick, cardsHand);
    }

    it('should return true if we play the first card',()=>{
        card = getCopyCard(types.diamonds, 7);
        const result = exec([],[]);
        expect(result).toBe(true);
    });

    it('should return true if we play the same kind as the first card played', ()=>{
        card = getCopyCard(types.diamonds, 7);
        const cardsTrick = [
            new Action('', getCopyCard(types.diamonds, 11))            
        ];
        const result = exec(cardsTrick,[]);
        expect(result).toBe(true);
    });

    describe('play trump (cut, overcut, undercut)', ()=>{
        it('should return true if we cut a pile uncut', ()=>{
            card = getCopyCard(trump, 7);
            const cardsTrick = [
                new Action('', getCopyCard(types.diamonds, 11))                
            ]
            const result = exec(cardsTrick, []);    
            expect(result).toBe(true);
        });
    
        it('should return true if we overcut', ()=>{
            card = getCopyCard(trump, 14);
            const cardsTrick = [
                new Action('',getCopyCard(types.diamonds, 11) ),
                new Action('',getCopyCard(types.clubs, 7))
            ];            
            const result = exec(cardsTrick, []);    
            expect(result).toBe(true);
        });
    
        describe('undercut', ()=>{
            it('should return false if we undercut when there is an other option', ()=>{
                card = getCopyCard(trump, 6);
                const cardsTrick = [
                    new Action('', getCopyCard(types.diamonds, 11)),
                    new Action('', getCopyCard(trump, 7))
                ];
                const cardsHand = [
                    getCopyCard(types.diamonds, 8)
                ];
                const result = exec(cardsTrick, cardsHand);                
                expect(result).toBe(false);
            });
        
            it('should return false if it is undercut and overcut is possible', ()=>{
                card = getCopyCard(trump, 6)
                const cardsTrick = [
                    new Action('', getCopyCard(types.diamonds, 11)),
                    new Action('', getCopyCard(trump, 7))                    
                ];
                const cardsHand = [
                    getCopyCard(types.clubs, 10)
                ];        
                const result = exec(cardsTrick, cardsHand);
                expect(result).toBe(false);        
            });
        
            it('should return true if it is undercut and there is no other choice', ()=>{
                card = getCopyCard(trump, 6)
                const cardsTrick = [
                    new Action('', getCopyCard(types.diamonds, 11)),
                    new Action('', getCopyCard(trump, 14))
                ];
                const cardsHand = [
                    getCopyCard(types.clubs, 10)
                ];        
                const result = exec(cardsTrick, cardsHand);
                expect(result).toBe(true);        
            });
        
            it('should return true if it is undercut with the bauer in hand', ()=>{
                card = getCopyCard(trump, 6);
                const cardsTrick = [
                    new Action('', getCopyCard(types.diamonds, 11)),
                    new Action('', getCopyCard(trump, 7))
                ];
                const cardsHand = [
                    getCopyCard(trump, 11)
                ];                        
                const result = exec(cardsTrick, cardsHand);
                expect(result).toBe(true);  
            });
        });
    });

    it('should return false if asked: trump, trump in hand that is not the bauer and trump not played', ()=>{
        card = getCopyCard(types.diamonds, 11);
        const cardsTrick = [
            new Action('',getCopyCard(trump, 6))
        ];
        const cardsHand = [
            getCopyCard(trump, 7)
        ];
        const result = exec(cardsTrick, cardsHand);
        expect(result).toBe(false);  
    });

    it('should return false if asked: not trump, asked type available in hand, but not played and trump not played', ()=>{
        card = getCopyCard(types.diamonds, 11);
        const cardsTrick = [
            new Action('',getCopyCard(types.hearts, 9))
        ];        
        const cardsHand = [
            getCopyCard(types.hearts, 7)
        ];
        const result = exec(cardsTrick, cardsHand);
        expect(result).toBe(false);  
    });

    it('should return true if based type is not played and not in hand', ()=>{
        card = getCopyCard(types.diamonds, 8);
        const cardsTrick = [
            new Action('',getCopyCard(types.hearts, 7))
        ];
        const cardsHand = [
            getCopyCard(types.diamonds, 10)
        ];
        const result = exec(cardsTrick, cardsHand);
        expect(result).toBe(true);          
    });

    it('should return true if based type is trump, but not played because not available', ()=>{
        card = getCopyCard(types.diamonds, 10);
        const cardsTrick = [
            new Action('',getCopyCard(types.clubs, 10))
        ];        
        const cardsHand = [
            getCopyCard(types.diamonds, 11)
        ];
        const result = exec(cardsTrick, cardsHand);
        expect(result).toBe(true);   
    });

    it('should return true ', ()=>{
        card = getCopyCard(types.hearts, 6);
        
        const cardsTrick = [
            new Action('',getCopyCard(trump, 13)),
            new Action('',getCopyCard(trump, 9)),
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


        const result = exec(cardsTrick, cardsHand);
        expect(result).toBe(true);  
    });
});
