
const {getCopyCard, types} = require('../../../db/deck');
const {typesAnnounces} = require('../../../db/announcesPoints');
const {findSequences} = require('../../../communication/announces/findSequences');
const {find4Jacks,find4Nines,findFour10QKA} = require('../../../communication/announces/findSquares');
const {findAnnounces} = require('../../../communication/announces/announces');


describe("announces", ()=>{

    it("Should return true when there are four jacks in the hand", ()=>{
        let hand = [
            getCopyCard(types.diamonds, 11),
            getCopyCard(types.spades, 11),
            getCopyCard(types.hearts, 11),
            getCopyCard(types.clubs, 11),
            getCopyCard(types.clubs, 6),
            getCopyCard(types.clubs, 7),
            getCopyCard(types.diamonds, 8),
            getCopyCard(types.diamonds, 9),
            getCopyCard(types.clubs, 10),
        ];

        const result = find4Jacks(hand);
        

        expect(result.announce).toBe(typesAnnounces.fourJacks);
    });

    it("Should return points 100 when there are four 10 || queen || kings || aces in the hand", ()=>{
        let hand = [
            getCopyCard(types.diamonds, 14),
            getCopyCard(types.spades, 14),
            getCopyCard(types.hearts, 14),
            getCopyCard(types.clubs, 14),

            getCopyCard(types.clubs, 6),
            getCopyCard(types.clubs, 7),
            getCopyCard(types.diamonds, 8),
            getCopyCard(types.diamonds, 13),
            getCopyCard(types.clubs, 10),
        ];

        const result = findFour10QKA(hand); 

        expect(result[0].announce).toBe(typesAnnounces.four10QKA);
    });
    it("Should return power 5 points 150 when there are four nines in the hand", ()=>{
        let hand = [
            getCopyCard(types.diamonds, 9),
            getCopyCard(types.spades, 9),
            getCopyCard(types.hearts, 9),
            getCopyCard(types.clubs, 9),
            getCopyCard(types.clubs, 6),
            getCopyCard(types.clubs, 7),
            getCopyCard(types.diamonds, 8),
            getCopyCard(types.diamonds, 13),
            getCopyCard(types.clubs, 10),
        ];

        const result = find4Nines(hand);        

        expect(result.announce).toBe(typesAnnounces.fourNines);
    });

    describe('annouces.findSequences', ()=> {
        it("should return type 1, points 20, cards.length 3", ()=>{
            let hand = [
                getCopyCard(types.clubs, 6),
                getCopyCard(types.clubs, 7),
                getCopyCard(types.clubs, 8),
                getCopyCard(types.diamonds, 12),
                getCopyCard(types.spades, 11),
                getCopyCard(types.hearts, 9),
                getCopyCard(types.diamonds, 8),
                getCopyCard(types.diamonds, 13),
                getCopyCard(types.clubs, 10),
            ];
    
            const result = findSequences(hand)[0];   
    
            expect(result.announce).toBe(typesAnnounces.sequence3);
            expect(result.cards.length).toBe(3);
            expect(result.cards).toContain(hand[0]);
            expect(result.cards).toContain(hand[1]);
            expect(result.cards).toContain(hand[2]);
        });
    
        it("should return type 2, points 50, cards.length 4", ()=>{
            let hand = [
                getCopyCard(types.clubs, 6),
                getCopyCard(types.clubs, 7),
                getCopyCard(types.clubs, 8),
                getCopyCard(types.clubs, 9),
                getCopyCard(types.diamonds, 12),
                getCopyCard(types.spades, 11),
                getCopyCard(types.hearts, 9),
                getCopyCard(types.diamonds, 8),
                getCopyCard(types.diamonds, 13),
            ];
    
            const result = findSequences(hand)[0];   
    
            expect(result.announce).toBe(typesAnnounces.sequence4);
            
            expect(result.cards.length).toBe(4);
            expect(result.cards).toContain(hand[0]);
            expect(result.cards).toContain(hand[1]);
            expect(result.cards).toContain(hand[2]);
            expect(result.cards).toContain(hand[3]);
        });
    
        it("should return type 4, points 100, cards.length 5", ()=>{
            let hand = [
                getCopyCard(types.clubs, 6),
                getCopyCard(types.clubs, 7),
                getCopyCard(types.clubs, 8),
                getCopyCard(types.clubs, 9),
                getCopyCard(types.diamonds, 12),
                getCopyCard(types.spades, 11),
                getCopyCard(types.hearts, 9),
                getCopyCard(types.diamonds, 8),
                getCopyCard(types.clubs, 10),
            ];
    
            const result = findSequences(hand)[0];   
    
            expect(result.announce).toBe(typesAnnounces.sequence5);
            expect(result.cards.length).toBe(5);
            expect(result.cards).toContain(hand[0]);
            expect(result.cards).toContain(hand[1]);
            expect(result.cards).toContain(hand[2]);
            expect(result.cards).toContain(hand[3]);
            expect(result.cards).toContain(hand[8]);
        });
    
        it("should return two announces when there are 8 cards in a sequences", ()=>{
            let hand = [
                getCopyCard(types.clubs, 6),
                getCopyCard(types.clubs, 7),
                getCopyCard(types.clubs, 8),
                getCopyCard(types.clubs, 9),
                getCopyCard(types.clubs, 10),
                getCopyCard(types.clubs, 11),
                getCopyCard(types.clubs, 12),
                getCopyCard(types.clubs, 13),
                getCopyCard(types.clubs, 14),
            ];
    
            const result = findSequences(hand);   
    
            expect(result[0].announce).toBe(typesAnnounces.sequence5);
            expect(result[0].cards.length).toBe(5);
            expect(result[0].cards).toContain(hand[4]);
            expect(result[0].cards).toContain(hand[5]);
            expect(result[0].cards).toContain(hand[6]);
            expect(result[0].cards).toContain(hand[7]);
            expect(result[0].cards).toContain(hand[8]);
            
            expect(result[1].announce).toBe(typesAnnounces.sequence4);;
            expect(result[1].cards.length).toBe(4);
            expect(result[1].cards).toContain(hand[0]);
            expect(result[1].cards).toContain(hand[1]);
            expect(result[1].cards).toContain(hand[2]);
            expect(result[1].cards).toContain(hand[3]);
        });
    });

    it('should return the biggest announces and only one, when there is one card that could be used in several announces', ()=>{
        let hand = [
            getCopyCard(types.clubs, 11),
            getCopyCard(types.spades, 11),
            getCopyCard(types.diamonds, 11),
            getCopyCard(types.hearts, 11),
            getCopyCard(types.clubs, 12),
            getCopyCard(types.clubs, 10),
            getCopyCard(types.clubs, 7),
            getCopyCard(types.diamonds, 8),
            getCopyCard(types.diamonds, 13),
        ];

        const result = findAnnounces(hand); 

        expect(result.length).toBe(1);
        expect(result[0]).toBe(typesAnnounces.fourJacks);
    })

    it('should return two announces when there are two squares', ()=>{
        let hand = [
            getCopyCard(types.clubs, 11),
            getCopyCard(types.spades, 11),
            getCopyCard(types.diamonds, 11),
            getCopyCard(types.hearts, 11),
            getCopyCard(types.clubs, 9),
            getCopyCard(types.spades, 9),
            getCopyCard(types.diamonds, 9),
            getCopyCard(types.hearts, 9),
            getCopyCard(types.clubs, 12),
        ];

        const result = findAnnounces(hand); 
        expect(result.length).toBe(2);
        expect(result[0]).toBe(typesAnnounces.fourJacks);
        expect(result[1]).toBe(typesAnnounces.fourNines);
    });

    it('should return only one sequence when there is a sequence of 6, a seq of 5 is return', ()=>{
        let hand = [
            getCopyCard(types.clubs, 6),
            getCopyCard(types.clubs, 7),
            getCopyCard(types.clubs, 8),
            getCopyCard(types.clubs, 9),
            getCopyCard(types.clubs, 10),
            getCopyCard(types.clubs, 11),
            getCopyCard(types.diamonds, 12),
            getCopyCard(types.hearts, 9),
            getCopyCard(types.clubs, 12),
        ];

        const result = findAnnounces(hand); 
        expect(result.length).toBe(1);
        expect(result[0]).toBe(typesAnnounces.sequence5);
    })

    it('should return a square + seq4 when there is a seq 5, but one of these cards is needed for a square', ()=>{
        let hand = [
            getCopyCard(types.clubs, 14),
            getCopyCard(types.diamonds, 14),
            getCopyCard(types.hearts, 14),
            getCopyCard(types.spades, 14),

            getCopyCard(types.clubs, 13),
            getCopyCard(types.clubs, 12),
            getCopyCard(types.clubs, 11),
            getCopyCard(types.clubs, 10),
            getCopyCard(types.diamonds, 9),
        ];

        const result = findAnnounces(hand); 
        expect(result.length).toBe(2);
        expect(result[0]).toBe(typesAnnounces.four10QKA);
        expect(result[1]).toBe(typesAnnounces.sequence4);
    })


});