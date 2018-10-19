'use strict';
const util = require('../common/util');
const ContactRepo = require('../repository/contact.repository');
const ContactService = {};

ContactService.addContactRequest = (contact) => {
    contact.status = util.status.PENDING;
    return ContactRepo.addContactRequest(contact);
};

ContactService.getPendingList = (id) => {
    return ContactRepo.getPendingList(id);
};

module.exports = ContactService;