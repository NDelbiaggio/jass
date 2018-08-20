const {types, getCopyCard} = require('../../../../db/deck');
const {Trick} = require('../../../../models/trick');
const {Action} = require('../../../../models/action');

describe('Object Trick', ()=>{
    let actions;

    beforeEach(()=>{
        actions = [
            new Action('', getCopyCard(types.diamonds, 7)),
            new Action('', getCopyCard(types.diamonds, 8)),
            new Action('', getCopyCard(types.diamonds, 9))
        ];
    })

    it('should return the first card when getFirstCards is called', ()=>{
        let trick = new Trick(1, types.diamonds, actions);
        const result = trick.getFirstCard();
        expect(result).toBe(actions[0].card);
    });

    it('should return the leading card', ()=>{
        let trick = new Trick(1,types.diamonds, actions, 2);
        const result = trick.getLeadingCard();
        expect(result).toBe(actions[2].card); 
    });

    it('should return true if there is not card and isEmpty is called', ()=>{
        this.actions = [];
        let trick = new Trick(1,types.diamonds,);
        const result = trick.isEmpty();
        expect(result).toBeTruthy();
    })
    it('should return false if there is at least one card in the trick and isEmpty is called', ()=>{
        let trick = new Trick(1,types.diamonds, actions);
        const result = trick.isEmpty();
        expect(result).toBeFalsy();
    })
})