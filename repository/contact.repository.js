const mongoose = require('mongoose');
const ObjectId = mongoose.ObjectId;
const User = require('../model/user.model');
const Contact = require('../model/contact.model');
const q = require('q');
const util = require('../common/util');
const ContactRepo = {};

ContactRepo.addContactRequest = (contact) => {
    let deferred = q.defer();
    contact.save((err, contact) => {
        if(err)
            deferred.reject(err);
        deferred.resolve(contact);
    });
    return deferred.promise;
};

ContactRepo.findById = (id) => {
    let deferred = q.defer();
    Contact.findById(id)
        .exec((err, contact) => {
            if(err) {
                deferred.reject(err);
            }
            deferred.resolve(contact);
        });
    return deferred.promise;
};

ContactRepo.getPendingList = (_id) => {
    let deferred = q.defer();
    console.log(_id);
    Contact.find({ sent_to: _id })
        .and({status: util.status.PENDING})
        .populate('sent_by')
        .exec((err, pendingRequests) => {
            if(err) {
                deferred.reject(err);
            }
            deferred.resolve(pendingRequests);
        });
    return deferred.promise;
};

ContactRepo.updateContactRequest  = (id, contact) => {
    let deferred = q.defer();
    Contact.update({_id: id}, contact, (err, _contact) => {
        if(err) {
            deferred.reject(err);
        }
        deferred.resolve(_contact);
    });
    return deferred.promise;
};

ContactRepo.getContactList = (id) => {
    let deferred = q.defer();
    const subDocumentProjection = '_id firstname lastname mobile_number';
    Contact.find({$or: [{sent_to: id}, {sent_by: id}]})
        .and({status: util.status.ACCEPTED})
        .select('sent_to sent_by status')
        .populate({ path: 'sent_to', match: {_id: {$ne: id}} , select: subDocumentProjection})
        .populate({ path: 'sent_by', match: {_id: {$ne: id}}, select: subDocumentProjection})
        .lean()
        .exec((err, list) => {
            if(err) {
                deferred.reject(err);
            }
            console.log('list = ');
            console.log(list);
            deferred.resolve(list);
        });
    return deferred.promise;
};

module.exports = ContactRepo;