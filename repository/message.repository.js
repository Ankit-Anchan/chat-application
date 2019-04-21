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
        $or: [
        {
            $and: [{sent_by: sent_by}, {sent_to_user: sent_to}],
        },
        {
            $and: [{sent_by: sent_to}, {sent_to_user: sent_by}]
        }] 
    }, [], {
        limit: 10
    })
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

MessageRepository.getUnreadMessages = async (to, from) => {
    console.log('sent by = ' + from);
    console.log('sent to user = ' + to);
    return await Message.find({
        $and: [{is_read: 0}, {sent_by: from}, {sent_to_user: to}]
    }).sort({created_at: 1}).lean().exec();
};

MessageRepository.markAsRead = async (to, from) => {
    return await Message.updateMany(
        {
            $and: [
                { sent_by: from },
                { sent_to_user: to },
                { created_at: { $lte: new Date().toISOString() }},
                { is_read: 0}
            ]
        },
        {
        $set: { is_read: 1 }
    })
};

module.exports = MessageRepository;