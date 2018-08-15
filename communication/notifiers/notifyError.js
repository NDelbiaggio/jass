

function notifyActionNotAllowed(socket, message){
    socket.emit("not allowed", {message})
}

exports.notifyActionNotAllowed = notifyActionNotAllowed;