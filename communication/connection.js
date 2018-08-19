const {addPlayerListener, disconnectPlayer} = require('../communication/listeners/addPlayerListener');

const {Game} = require('../models/game');

exports.connection = function(server){
    io = require('socket.io')(server);
    let game = new Game();

    io.on('connection', (socket) => {
        addPlayerListener(io, socket, game);
        
        socket.on('disconnect', (reason) => {
            console.log("disconnect, reason: " + reason);
            
            if(socket.addedUser){
                disconnectPlayer(io, socket.id, game);
            }
        }); 
        
        socket.on('disconnecting', (reason)=>{
            console.log('disconnecting: ', reason)
        })

        socket.on('connect', ()=>{
            console.log('I connect or reconnect, socket id: ',socket.id );
        })
        
        
        socket.on('connect_error',(param)=>{
            console.log('connect error',param);
        });
        socket.on('connect_timeout',()=>{
            console.log('connect timeout');
        });
        socket.on('reconnect',(param)=>{
            console.log('reconnect: ',param);
        });
        socket.on('reconnect_attempt',()=>{
            console.log('reconnect attempt ');
        });
        socket.on('reconnecting',(param)=>{
            console.log('reconnecting ',param);
        });
        socket.on('reconnect_error',(param)=>{
            console.log('reconnect error: ',param);
        });
        socket.on('reconnect_failed',()=>{
            console.log('reconnect failed');
        });
        socket.on('ping',()=>{
            console.log('ping');
        });
        socket.on('pong',(param)=>{
            console.log(param);
        });

        // socket.on('',(param)=>{
        //     console.log(param);
        // });
    });    
}
