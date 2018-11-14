let userSocketRepo = {};

userSocketRepo.userSockets = {};

userSocketRepo.addNewSocket = (socketId, socket, data) => {
    let socketObj = userSocketRepo.userSockets[data.sent_by];
    if(socketObj) {
        let obj = {
            socket_id: socketId,
            socket: socket
        }
        socketObj.push(obj);
        userSocketRepo.userSockets[data.sent_by] = socketObj;
    }
    else {
        let arr = [];
        let obj = {
            socket_id: socketId,
            socket: socket
        };
        arr.push(obj);
        userSocketRepo.userSockets[data.sent_by] = arr;
    }
    console.log(userSocketRepo.userSockets);
};

userSocketRepo.deleteSocket = (socketId) => {
    for(let key in userSocketRepo.userSockets) {
        if (userSocketRepo.userSockets.hasOwnProperty(key)) {
            let arr = userSocketRepo.userSockets[key];
            let filteredArr = arr.filter((value, index, arr) => {
                return value.socket_id != socketId;
            });
            userSocketRepo.userSockets[key] = filteredArr;
        }
        if(userSocketRepo.userSockets[key].length === 0) {
            delete userSocketRepo.userSockets[key];
        }
    }
};

userSocketRepo.getSocketByUsername = (username) => {
    if(!userSocketRepo.userSockets[username]) {
        return [];
    }
    return userSocketRepo.userSockets[username];
}

module.exports = userSocketRepo;