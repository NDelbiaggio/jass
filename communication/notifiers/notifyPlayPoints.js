
const eventName = "playPoints";

function notifyPlayPoints(io, payload){
    io.emit(eventName, payload);
}

module.exports = notifyPlayPoints;