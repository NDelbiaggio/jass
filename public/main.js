$(function () {
    var $playerUsername = $('.playerUsername');
    var socket = io.connect('http://localhost:3400');
        
    var players = [];
    var handCards; 
    plie = {
        cards: []
    }
    var atout;

    /*Connexion to server */
    socket.emit('add player', `Player ${(Math.random() * 10) + 1}`);
    
    /*Display username */
    socket.on('login', (player)=>{
        $playerUsername.text(player.playerName);        
    });

    /* A player joined - display it in the list */
    socket.on('player joined', (res)=>{
        players = res.players;
        for (let i = 0; i < players.length; i++) {
           $(`.player-${i+1}`).text(`${i+1}) ${players[i].name}`);
        }
    });

    /* Receive cards and display them */
    socket.on('cards distribution', (res)=>{
        console.log("Cards distribution");
        console.log(res.cards);
        handCards = res.cards;
        handCards.sort((a, b)=>{
            return a.sortIndex > b.sortIndex
        });
        $('.cards').css({"display": "flex"})
        $('.card  > img').each(function(index){
            const card = handCards[index];
            $(this).attr("src", card.imgSrc);
            $(this).attr("alt", `${card.name} ${card.type} ${card.power}`);
        });
    });

    /*Receive the card played and display it */
    socket.on('card played', (res)=>{
        var card = res.card;
        plie.cards.push(card);
        setHighestCardIndex(atout, card, plie.cards)
        const ind = plie.cards.length;
        $(`#card-pile-${ind} > img`).attr("src", card.imgSrc);
        $(`#card-pile-${ind} > img`).attr("alt", `${card.name} ${card.type} ${card.power}`);
        if(ind == 4){
            setTimeout(() => {
                $('.card-pile > img').attr("src","");
                $('.card-pile > img').attr("alt","");
            }, 2000);
            plie.cards = [];
            highestCardIndex = 0;
        }
    });

    /*Play a card - send it to others */
    $('.card').dblclick(function(){
        let card = handCards[$(this).attr('value')]; 
        var isPlayable = isCardPlayable(card, atout, plie, handCards);
        if(isPlayable){
            socket.emit('play', card);
            $(this).css("display", "none");
    
            $('.card  > img').each(function(index){
                $(this).css("opacity", "0.5");
            });
    
            var ind = $(this).attr("value");
            
            card.available = false;
            console.log("The following card has been played.")
            console.log(card);
        }else{
            console.log("NOT ALLOWED TO PLAY THIS CARD");
        }

    });

    /*Is notified to choose the atout and emit the atout to others */
    socket.on('choose atout', ()=>{
        $('.atoutSelector'). css("display", "flex");
        $('.message').text('Choose atout');
    });

    //ATOUT has been chosen and is sent
    $('.atoutSelector > img').dblclick(function(){
        let atout = $(this).attr("value");
        socket.emit('atout', {atout});
        $('.atoutSelector').css("display", "none");
    });    

    //Receives the atout that has been chosen
    socket.on('atout chosen', (res)=>{
        atout = res.atout;
        $('.message').text(`Atout is : ${res.atout}`);
    });

    //Receive the message to play
    socket.on('your turn', ()=>{
        $('.card  > img').each(function(index){
            let card = handCards[index];
            var isPlayable = isCardPlayable(card, atout, plie, handCards);
            if(isPlayable){
                $(this).css("opacity", "1");
            }
        });
    });
        
})


var highestCardIndex = 0;
function setHighestCardIndex(atout, card, cards, ){
    let isHigher = isCardHigher(atout, card, cards[highestCardIndex]);
    if(cards.length == 1){
        isHigher = true;
    }
    if(isHigher){
        highestCardIndex = cards.length - 1;
    }
    return cards.length;
}

function isCardHigher(atout, card, leadingCard){
    if(card.type == atout && leadingCard.type != atout) return true;
    if(card.type != atout && leadingCard.type == atout) return false;
    if(card.type != atout && leadingCard.type != atout){
        if(card.type != leadingCard.type) return false;
        return card.power > leadingCard.power
    }else{
        return card.atoutPower > leadingCard.atoutPower
    }
}

function isCardPlayable(card, atout, plie, cardsInHand) {
    
    //The player plays the first card
    if (plie.cards.length == 0) {
        console.log("Plie empty")
        return true;
    }

    const firstCardPlayed = plie.cards[0];
    const leadingCard = plie.cards[highestCardIndex];

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
            console.log("leading card: " + leadingCard)
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
                        return c.type != atout && c.available !=false
                    });
                    //hand has sth else than atout
                    if (result) return false //throw new Error('Not allowed to under cut');
                    //has only atout
                    const res = cardsInHand.find((c) => {
                        return c.type == atout && c.atoutPower > leadingCard.atoutPower && c.atoutPower != 9 && c.available !=false;
                    });
                    if (res) return false; //throw new Error('Not allowed to under cut if you pocess an atout higher');
                    //return plie.addCardPlayed(card);
                    return true;
                }
            }
        } else {
            let result = cardsInHand.find(c => {
                return c.type == firstCardPlayed.type && c.available !=false;
            });
            if (result) return false;
            return true;
        }
    } else {
        let result = cardsInHand.find(c => {
            return c.type == firstCardPlayed.type && c.atoutPower != 9 && c.available !=false;
        });
        if (result) return false;
        return true;

    }
}
