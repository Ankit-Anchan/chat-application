const messageRepository = require('../repository/message.repository');
const userRepository = require('../repository/user.repository');
const MessageService = {};

MessageService.addMessage = (messagePayload) => {
    // sent by, sent to user, message
    let data = {
        sent_by: messagePayload.sent_by,
        sent_to_user: messagePayload.sent_to,
        is_deleted: 0,
        message: messagePayload.message
    };
    console.log('message data = ');
    console.log(data);
    return messageRepository.addMessage(data);
};

MessageService.getMessages = (sent_by, sent_to) => {
    return messageRepository.getMessages(sent_by, sent_to);
};

module.exports = MessageService;