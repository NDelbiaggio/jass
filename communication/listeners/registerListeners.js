const playListener = require('./playListener');
const trumpListener = require('./trumpListener');

module.exports = function registerListeners(io, socket, game){
    trumpListener(io, socket, game.players, game.play);
    playListener(io, socket, game.players, game.play, game); 
}