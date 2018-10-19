'use strict';
const router = require('express').Router();
const service = require('../service/user.service');
const contactService = require('../service/contact.service');
const ApplicationError = require('../common/error');
let Contact = require('../model/contact.model');

/* Send a friend request to a particular contact */
router.post('/request/send', function(req, res, next) {
    const id = req.id;
    let contact = new Contact(req.body);
    contact.sent_by = id;
    contactService.addContactRequest(contact)
        .then(() => {
            res.status(200).send({message: 'success'});
        })
        .catch((err) => {
            return next(new ApplicationError.InternalServerError(err));
        });
});

/* Get list of friend request those are pending*/
router.get('/request/pending', function(req, res, next) {
    const id = req.id;
    contactService.getPendingList(id)
        .then(pendingRequests => {
            if(pendingRequests.length === 0) {
                return next(new ApplicationError.NotFound('No Pending Requests'));
            }
            return res.status(200).send(pendingRequests);
        })
        .catch(err => {
            return next(new ApplicationError.InternalServerError(err));
        });
});

/* Accept a friend request from a particular contact*/
router.post('request/accept', function(req, res, next) {
    res.status(200).send({message: 'success'});
});

/* Decline a friend request from a particular contact */
router.post('request/decline', function(req, res, next) {
    res.status(200).send({message: 'success'});
});

/* Unfriend an already added friend by removing from friend's list */
router.post('request/remove', function(req, res, next){
    res.status(200).send({message: 'success'});
});

module.exports = router;
