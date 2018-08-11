
const eventName = "playPoints";

function notifyPlayPoints(io, payload){
    console.log(payload)
    io.emit(eventName, payload);
}

module.exports = notifyPlayPoints;