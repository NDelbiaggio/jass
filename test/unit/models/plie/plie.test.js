const {types, getCopyCard} = require('../../../../db/lstCards');
const {Plie} = require('../../../../models/plie');
const {Action} = require('../../../../models/action');

describe('Object Plie', ()=>{
    let actions;

    beforeEach(()=>{
        actions = [
            new Action('', getCopyCard(types.diamonds, 7)),
            new Action('', getCopyCard(types.diamonds, 8)),
            new Action('', getCopyCard(types.diamonds, 9))
        ];
    })

    it('should return the first card when getFirstCards is called', ()=>{
        let plie = new Plie(1, types.diamonds, actions);
        const result = plie.getFirstCard();
        expect(result).toBe(actions[0].card);
    });

    it('should return the leading card', ()=>{
        let plie = new Plie(1,types.diamonds, actions, 2);
        const result = plie.getLeadingCard();
        expect(result).toBe(actions[2].card); 
    });

    it('should return true if there is not card and isEmpty is called', ()=>{
        this.actions = [];
        let plie = new Plie(1,types.diamonds,);
        const result = plie.isEmpty();
        expect(result).toBeTruthy();
    })
    it('should return false if there is at least one card in the plie and isEmpty is called', ()=>{
        let plie = new Plie(1,types.diamonds, actions);
        const result = plie.isEmpty();
        expect(result).toBeFalsy();
    })
})