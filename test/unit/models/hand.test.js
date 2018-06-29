const {Hand} = require('../../../models/hand');
const {Card} = require('../../../models/card');
const {Plie} = require('../../../models/plie');

describe('hand.addCardPlayed', ()=>{
    const atout = 'clubs';
    let card
    let plie;

    function exec (cardsPlie, cardsHand){
        plie = new Plie({
            cards: cardsPlie,
            highestCardIndex: cardsPlie.length -1
        });
        return new Hand({cards: cardsHand}).addCardPlayed(card, atout, plie);
    }

    it('should return true if we play the first card',()=>{
        card = new Card({type: 'diamonds',name: 'seven',power: 7});        
        const result = exec([],[]);
        expect(result).toBe(true);
    });

    it('should return true if we play the same kind as the first card played', ()=>{
        card = new Card({type: 'diamonds', name:'seven', power: 7});
        const cardsPlie = [
            new Card({type: 'diamonds', name: 'valet', power: 11})
        ];
        const result = exec(cardsPlie,[]);
        expect(result).toBe(true);
    });

    describe('play atout (cut, overcut, undercut)', ()=>{
        it('should return true if we cut a pile uncut', ()=>{
            card = new Card({type: atout, name: 'seven',power: 7});
            const cardsPlie = [
                new Card({type: 'diamonds', name: 'valet', power: 11})
            ]
            const result = exec(cardsPlie, []);    
            expect(result).toBe(true);
        });
    
        it('should return true if we overcut', ()=>{
            card = new Card({type: atout, name: 'ace',power: 14, atoutPower: 7});
            const cardsPlie = [
                new Card({type: 'diamonds', name: 'valet', power: 11}),
                new Card({type: 'clubs', name: 'seven', power: 7, atoutPower: 2})
            ]            
            const result = exec(cardsPlie, []);    
            expect(result).toBe(true);
        });
    
        describe('undercut', ()=>{
            it('should return false if we undercut when there is an other option', ()=>{
                card = new Card({type: atout, name: 'six',power: 6, atoutPower: 1});
                const cardsPlie = [
                    new Card({type: 'diamonds', name: 'valet', power: 11}),
                    new Card({type: atout, name: 'seven', power: 7, atoutPower: 2})
                ];
                const cardsHand = [
                    new Card({type: 'diamonds', name: 'eight', power: 8, atoutPower: 3})
                ];
                const result = exec(cardsPlie, cardsHand);                
                expect(result).toBe(false);
            });
        
            it('should return false if it is undercut and overcut is possible', ()=>{
                card = new Card({type: atout, name: 'six',power: 6, atoutPower: 1});
                const cardsPlie = [
                    new Card({type: 'diamonds', name: 'valet', power: 11}),
                    new Card({type: atout, name: 'seven', power: 7, atoutPower: 2})
                ];
                const cardsHand = [
                    new Card({type: 'clubs', name: 'ten', power: 10, atoutPower: 5})
                ];        
                const result = exec(cardsPlie, cardsHand);
                expect(result).toBe(false);        
            });
        
            it('should return true if it is undercut and there is no other choice', ()=>{
                card = new Card({type: atout, name: 'six',power: 6, atoutPower: 1});
                const cardsPlie = [
                    new Card({type: 'diamonds', name: 'valet', power: 11}),
                    new Card({type: atout, name: 'ace', power: 14, atoutPower: 7})
                ];
                const cardsHand = [
                    new Card({type: 'clubs', name: 'ten', power: 10, atoutPower: 5})
                ];        
                const result = exec(cardsPlie, cardsHand);
                expect(result).toBe(true);        
            });
        
            it('should return true if it is undercut with the bauer in hand', ()=>{
                card = new Card({type: atout, name: 'six',power: 6, atoutPower: 1});
                const cardsPlie = [
                    new Card({type: 'diamonds', name: 'valet', power: 11}),
                    new Card({type: atout, name: 'seven', power: 7, atoutPower: 2})
                ];
                const cardsHand = [
                    new Card({type: 'clubs', name: 'valet', power: 11, atoutPower: 9})
                ];                        
                const result = exec(cardsPlie, cardsHand);
                expect(result).toBe(true);  
            });
        });
    });

    it('should return false if atout is not played but a different than the bauer is in the hand', ()=>{
        card = new Card({type: 'diamonds', name: 'valet',power: 11});
        const cardsPlie = [
            new Card({type: atout, name: 'six', power: 6, atoutPower: 1})
        ];
        const cardsHand = [
            new Card({type: atout, name: 'seven', power: 7, atoutPower: 2})
        ];
        const result = exec(cardsPlie, cardsHand);
        expect(result).toBe(false);  
    });

    it('should return false if based type is not played but available in hand', ()=>{
        card = new Card({type: 'diamonds', name: 'valet',power: 11});
        const cardsPlie = [
            new Card({type: 'hearts', name: 'nine', power: 9})
        ];        
        const cardsHand = [
            new Card({type: 'hearts', name: 'seven', power: 7})
        ];
        const result = exec(cardsPlie, cardsHand);
        expect(result).toBe(false);  
    });

    it('should return true if based type is not played and not in hand', ()=>{
        card = new Card({type: 'diamonds', name: 'eight',power: 8});
        const cardsPlie = [
            new Card({type: 'hearts', name: 'seven', power: 7})
        ];
        const cardsHand = [
            new Card({type: 'diamonds', name: 'ten', power: 10})
        ];
        const result = exec(cardsPlie, cardsHand);
        expect(result).toBe(true);          
    });

    it('should return true if based type is atout, but not played because not available', ()=>{
        card = new Card({type: 'diamonds', name: 'ten',power: 10});
        const cardsPlie = [
            new Card({type: 'clubs', name: 'ten', power: 10})
        ];        
        const cardsHand = [
            new Card({type: 'diamonds', name: 'valet', power: 11})
        ];
        const result = exec(cardsPlie, cardsHand);
        expect(result).toBe(true);   
    });
});
