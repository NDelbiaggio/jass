const playListener = require('./playListener');
const atoutListener = require('./atoutListener');

module.exports = function registerListeners(io, socket, game){
    atoutListener(io, socket, game.players, game.play);
    playListener(io, socket, game.players, game.play, game); 
}