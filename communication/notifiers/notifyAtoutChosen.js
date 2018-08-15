
const eventName = "atout";

function notifyAtout(io, atout){
    io.emit(eventName, {atout});   
}

exports.notifyAtout = notifyAtout;