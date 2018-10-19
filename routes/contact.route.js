'use strict';
const router = require('express').Router();
const service = require('../service/user.service');
const ApplicationError = require('../common/error');

/* Send a friend request to a particular contact */
router.post('/request/send', function(req, res, next) {
    res.status(200).send({message: 'success'});
});

/* Get list of friend request those are pending*/
router.get('request/pending', function(req, res, next) {
    res.status(200).send({message: 'success'});
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
