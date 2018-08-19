exports.isCardPlayable = function isCardPlayable(card, atout, plie, cardsInHand) {
    let cards = plie.getCards();
    
    //The player plays the first card
    if (cards.length == 0) {
        return true;
    }

    const firstCardPlayed = plie.getFirstCard();
    const leadingCard = plie.getLeadingCard();

    //The player plays 
    if (card.type == firstCardPlayed.type) {
        return true;
    }

    //First card played is not atout
    if (firstCardPlayed.type != atout) {
        //want to cut
        if (card.type == atout) {
            //has not been cut
            if (leadingCard.type != atout) {
                return true;
            } else { //has been cut
                //higher cut
                if (card.atoutPower > leadingCard.atoutPower) {
                    return true;
                } else {//under cut
                    const result = cardsInHand.find((c) => {
                        return c.type != atout
                    });
                    //hand has sth else than atout
                    if (result) return false //throw new Error('Not allowed to under cut');
                    //has only atout
                    const res = cardsInHand.find((c) => {
                        return c.type == atout && c.atoutPower > leadingCard.atoutPower && c.atoutPower != 9;
                    });
                    if (res) return false; //throw new Error('Not allowed to under cut if you pocess an atout higher');
                    return true;
                }
            }
        } else {
            let result = cardsInHand.find(c => {
                return c.type == firstCardPlayed.type;
            });
            if (result) return false;
            return true;
        }
    } else {
        let result = cardsInHand.find(c => {
            return c.type == firstCardPlayed.type && c.atoutPower != 9;
        });
        if (result) return false;
        return true;

    }
}