exports.isCardPlayable = function isCardPlayable(card, atout, plie, cardsInHand) {
    //The player plays the first card
    if (plie.cards.length == 0) {
        //return plie.addCardPlayed(card)
        return true;
    }

    const firstCardPlayed = plie.cards[0];
    const leadingCard = plie.cards[plie.highestCardIndex];

    //The player plays 
    if (card.type == plie.cards[0].type) {
        //return plie.addCardPlayed(card)
        return true;
    }

    //First card played is not atout
    if (firstCardPlayed.type != atout) {
        //want to cut
        if (card.type == atout) {
            //has not been cut
            if (leadingCard.type != atout) {
                //return plie.addCardPlayed(card);
                return true;
            } else { //has been cut
                //higher cut
                if (card.atoutPower > leadingCard.atoutPower) {
                    return true;
                    //return plie.addCardPlayed(card);
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
                    //return plie.addCardPlayed(card);
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