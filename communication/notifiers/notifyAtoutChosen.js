
const eventName = "atout chosen";

module.exports = function(io, atout){
    io.emit(eventName, {atout});   
}
