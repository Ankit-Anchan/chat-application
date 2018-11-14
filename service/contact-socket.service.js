let userSocketRepository = require('../repository/user-socket.repository');

const contactSocketService = {};

contactSocketService.emitEvent = (event, username, data) => {
    let socketList = userSocketRepository.getSocketByUsername(username);
    if(!socketList || socketList.length === 0) {
        return;
    }
    for(var i = 0; i < socketList.length; i++) {
        console.log("emitting " + event);
        socketList[i].socket.emit(event, data);
    }
};

module.exports = contactSocketService;