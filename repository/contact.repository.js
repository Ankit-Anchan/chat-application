const mongoose = require('mongoose');
let Contact = require('../model/contact.model');
const q = require('q');
const util = require('../common/util');
const ContactRepo = {};

ContactRepo.addContactRequest = (contact) => {
    let deferred = q.defer();
    contact.save((err) => {
        if(err)
            deferred.reject(err);
        deferred.resolve();
    });
    return deferred.promise;
};

ContactRepo.getPendingList = (_id) => {
    let deferred = q.defer();
    console.log(_id);
    Contact.find({ sent_to: _id })
        .and({status: util.status.PENDING})
        .populate('sent_to')
        .populate('sent_by')
        .exec((err, pendingRequests) => {
            if(err) {
                deferred.reject(err);
            }
            deferred.resolve(pendingRequests);
        });
    return deferred.promise;
};

module.exports = ContactRepo;