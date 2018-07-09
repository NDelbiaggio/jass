$(function () {
    var $window = $(window);
    var $playerUsername = $('.playerUsername');
    var $players = $('.players');

    var socket = io.connect('http://localhost:3400');
    
    
    var players = [];
    var hand; 
    plie = {
        cards: []
    }

    /*Connexion to server */
    socket.emit('add player', `Player ${(Math.random() * 10) + 1}`);
    
    /*Display username */
    socket.on('login', (player)=>{
        $playerUsername.text(player.playerName);        
    });

    /* A player joined - display it in the list */
    socket.on('player joined', (res)=>{
        players = res.players;
        $players.text($players.text() + res.playerName);
        for (let i = 0; i < players.length; i++) {
            $(`.player-${i+1}`).text(` ${i+1}) ${players[i].playerName}`);
        }
    });

    /* Receive cards and display them */
    socket.on('game start', (res)=>{
        hand = res.hand;
        $('.cards').css({"display": "flex"})
        $('.card  > img').each(function(index){
            const card = hand.cards[index];
            $(this).attr("src", card.imgSrc);
            $(this).attr("alt", `${card.name} ${card.type} ${card.power}`);
        });
    });

    /*Receive the card played and display it */
    socket.on('card played', (res)=>{
        var card = res.card;
        plie.cards.push(card);
        const ind = plie.cards.length;
        $(`#card-pile-${ind} > img`).attr("src", card.imgSrc);
        $(`#card-pile-${ind} > img`).attr("alt", `${card.name} ${card.type} ${card.power}`);
    });

    /*Play a card - send it to others */
    $('.card').dblclick(function(){
        let card = hand.cards[$(this).attr('value')];        
        socket.emit('play', card);
        $(this).css("display", "none");

        $('.card  > img').each(function(index){
            $(this).css("opacity", "0.5");
        });
    });

    /*Is notified to choose the atout and emit the atout to others */
    socket.on('choose atout', ()=>{
        $('.message').text('Choose atout');
        console.log('client I choose diamond')
        setTimeout(() => {            
            socket.emit('atout', {atout: 'diamonds'});
        }, 2000);
    });
    

    socket.on('atout chosen', (res)=>{
        $('.message').text(`Atout is : ${res.atout}`);
    });

    $('.sendAtout').click(function(){
        socket.emit('atout', {atout: 'diamonds'});
    });


    socket.on('your turn', ()=>{
        console.log('MY TURN')
        $('.card  > img').each(function(index){
            $(this).css("opacity", "1");
        });
    });
        
})