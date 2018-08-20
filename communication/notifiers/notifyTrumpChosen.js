
const eventName = "trump";

function notifyTrump(io, trump){
    io.emit(eventName, {trump});   
}

exports.notifyTrump = notifyTrump;
