const messageService = require('./message.service');
let userSocketRepository = require('../repository/user-socket.repository');

const MessageSocketService = {};

MessageSocketService.socket = {};

MessageSocketService.init = (socket) => {
    MessageSocketService.socket = socket;
    MessageSocketService.events();
};

MessageSocketService.events = () => {
    MessageSocketService.socket.on('upstream_message', (data) => {
        console.log('upstream message event invoked');
        console.log(data);
        data.created_at = Date.now();
        data.is_read = 0;
        let senderSocketList = userSocketRepository.getSocketByUsername(data.sent_by_username);
        let receiverSocketList = userSocketRepository.getSocketByUsername(data.sent_to_username);
        for(let i = 0; i < senderSocketList.length; i++) {
            console.log(i + 'emitting downstream message to sender ' + senderSocketList[i].socket_id);
            senderSocketList[i].socket.emit('downstream_message', data);
        }
        for(let i = 0; i < receiverSocketList.length; i++) {
            console.log(i + 'emitting downstream message to receiver' + receiverSocketList[i].socket_id);
            receiverSocketList[i].socket.emit('downstream_message', data);
        }        
        messageService.addMessage(data)
            .then(data => {
                console.log('message saved in the database');
            })
            .catch(err => {
                console.log(err);
            });
    });
};

module.exports = MessageSocketService;