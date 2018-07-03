$(function () {
    var $window = $(window);
    var $playersCounter = $('.playersCounter');
    var $lstPlayer = $('.lstPlayer');
    var $playerNum = $('.playerNum');

    var socket = io.connect('http://localhost:3000');
    
    socket.emit('add player', `Player ${(Math.random() * 10) + 1}`);

    var numPlayers = 0;
    var hand; 

    socket.on('login', (player)=>{
        $lstPlayer.text(player.username);
        $playerNum.text(player.numUsers);        
    });

    socket.on('player joined', (res)=>{
        $playersCounter.text(res.nbPlayers);
    });

    socket.on('game start', (res)=>{
        hand = res.hand;
        $('.cards').css({"display": "flex"})
        $('.card  > img').each(function(index){
            $(this).attr("src", hand.cards[index].imgSrc);
        });
    });

    $('.card > img').dblclick(function(){
        $('.card-pile > img').attr("src", $(this).attr('src'));
        $(this).parent().css("display", "none")
    });
    
})