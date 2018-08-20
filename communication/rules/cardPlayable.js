exports.isCardPlayable = function isCardPlayable(card, trump, trick, cardsInHand) {
    let cards = trick.getCards();
    //The player plays the first card
    if (cards.length == 0) {
        return true;
    }

    const firstCardPlayed = trick.getFirstCard();
    const leadingCard = trick.getLeadingCard();

    //The player plays 
    if (card.type == firstCardPlayed.type) {
        return true;
    }
    //First card played is not trump
    if (firstCardPlayed.type != trump) {
        //want to cut
        if (card.type == trump) {
            //has not been cut
            if (leadingCard.type != trump) {
                return true;
            } else { //has been cut
                //higher cut
                if (card.trumpPower > leadingCard.trumpPower) {
                    return true;
                } else {//under cut
                    const result = cardsInHand.find((c) => {
                        return c.type != trump
                    });
                    //hand has sth else than trump
                    if (result) return false 
                    //has only trump
                    const res = cardsInHand.find((c) => {
                        return c.type == trump && c.trumpPower > leadingCard.trumpPower && c.trumpPower != 9;
                    });
                    if (res) return false; 
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
            return c.type == firstCardPlayed.type && c.trumpPower != 9;
        });
        if (result) return false;
        return true;

    }
}