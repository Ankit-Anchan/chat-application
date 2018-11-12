'use strict';
const router = require('express').Router();
const service = require('../service/user.service');
const contactService = require('../service/contact.service');
const ApplicationError = require('../common/error');
let Contact = require('../model/contact.model');

/* Send a friend request to a particular contact */
router.post('/request/send', (req, res, next) => {
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
router.get('/request/pending', (req, res, next) => {
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
router.post('/request/accept/:request_id', (req, res, next) => {
    console.log(req.params.request_id);
    contactService.acceptContactRequest(req.params.request_id)
        .then((contact) => {
            res.status(200).send({message: 'success'});
        })
        .catch((err) => {
            return next(new ApplicationError.InternalServerError(err));
        });
});

/* Decline a friend request from a particular contact */
router.post('request/decline', (req, res, next) => {
    res.status(200).send({message: 'success'});
});

/* Unfriend an already added friend by removing from friend's list */
router.post('request/remove', (req, res, next) => {
    res.status(200).send({message: 'success'});
});

router.get('/list', (req, res, next) => {
    console.log('req.id');
    contactService.getContactList(req.id)
        .then(list => {
            if(list.length === 0) {
                return next(new ApplicationError.NotFound('No Contacts Yet'));
            }
            res.status(200).send(list);
        })
        .catch(err => {
            return next(new ApplicationError.InternalServerError('Something went wrong'));
        })
});

module.exports = router;
