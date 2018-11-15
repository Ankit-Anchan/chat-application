const q = require('q');
const Message = require('../model/message.model');
const MessageRepository = {};


MessageRepository.addMessage = (data) => {
    let deferred = q.defer();
    let message = new Message(data);
    console.log('saving new message');
    console.log(message);
    message.save((err, msg) => {
        if(err) {
            deferred.reject(err);
        }
        deferred.resolve(msg);
    });
    return deferred.promise;
};

MessageRepository.getMessages = (sent_by, sent_to) => {
    let deferred = q.defer();
    Message.find({
        $or: [{sent_by: sent_by}, {sent_by: sent_to}]
    }, [], {
        limit: 10
    })
    .and({$or: [{sent_to_user: sent_by}, {sent_to_user: sent_to}]})
    .sort({created_at: 1})
    .lean()
    .exec((err, messageList) => {
        if(err) {
            deferred.reject(err);
        }
        deferred.resolve(messageList);
    });
    return deferred.promise;
};

module.exports = MessageRepository;