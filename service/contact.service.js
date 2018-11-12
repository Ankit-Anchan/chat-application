'use strict';
const q = require('q');
const util = require('../common/util');
const ContactRepo = require('../repository/contact.repository');
const UserRepo = require('../repository/user.repository');
const contactSocketService = require('./contact-socket.service');
const ContactService = {};

ContactService.addContactRequest = (contact) => {
    contact.status = util.status.PENDING;
    let deferred = q.defer();
    return ContactRepo.addContactRequest(contact)
        .then(contact => {
            UserRepo.findById(contact.sent_by)
                       .then(user => {
                           user.contact_list.push(contact._id);
                           UserRepo.update(user._id, user);
                       })
                       .catch(err => {
                           deferred.reject(err);
                       });
                   UserRepo.findById(contact.sent_to)
                       .then(user => {
                           user.contact_list.push(contact._id);
                           UserRepo.update(user._id, user);
                           contactSocketService.emitEvent('new_request', user.mobile_number, {message: 'You have a new request!'});
                           deferred.resolve(contact);
                       })
                       .catch(err => {
                           deferred.reject(err);
                       });
        })
        .catch(err => {
            deferred.reject(err);
        });
        return deferred.promise;
};

ContactService.getPendingList = (id) => {
    return ContactRepo.getPendingList(id);
};

ContactService.acceptContactRequest = (id) => {
    let deferred = q.defer();
    ContactRepo.findById(id)
        .then(contact => {
            console.log(contact);
            contact.status = util.status.ACCEPTED;
            ContactRepo.updateContactRequest(id, contact)
            .then(_contact => {
                UserRepo.findById(contact.sent_by)
                .then(_user => {
                    let msg = _user.firstname + ' ' + _user.lastname + ' has accepted your request';
                    contactSocketService.emitEvent('accept_request', _user.mobile_number, {message: msg});
                });
                deferred.resolve();
            })
            .catch(err => {
                deferred.reject(err);
            });
        })
        .catch(err => {
            deferred.reject(err);
        });
    return deferred.promise;
};

ContactService.getContactList = (id) => {
    return ContactRepo.getContactList(id);
};

module.exports = ContactService;