'use strict';
const express = require('express');
const router = express.Router();

const ApplicationError = require('../common/error');
const service = require('../service/user.service');

/* GET users listing. */
router.get('/list', (req, res, next) => {
    service.getAllUsers()
        .then((users) => {
            if(users.length === 0) {
                return next(new ApplicationError.NotFound('Cannot find any users'));
            }
            res.status(200).send(users);
        })
        .catch((err) => {
            return next(new ApplicationError.InternalServerError(err));
        });
});

router.get('/:mobile_number', (req, res, next) => {
    service.getUserByMobileNumber(req.params.mobile_number)
        .then((user) => {
            res.status(200).send(user);
        })
        .catch((err) => {
            return next(new ApplicationError.NotFound('Cannot find user'));
        });
});

router.get('/details/:id', (req, res, next) => {
    service.findById(req.params.id)
        .then(user => {
            res.status(200).send(user);
        })
        .catch(err => {
            return next(new ApplicationError.NotFound('Cannot find user'));
        });
});

router.get('/me/info', (req, res, next) => {
    service.getUserByMobileNumber(req.username)
        .then((user) => {
            res.status(200).send(user);
        })
        .catch((err) => {
            return next(new ApplicationError.Unauthorized("There was a problem finding the user."))
        });
});

router.post('/search', (req, res, next) => {
    console.log('id = ' + req.id);
    service.searchUser(req.body.searchString, req.id)
        .then((_user) => {
            res.status(200).send(_user)
        })
        .catch(err => {
            return next(new ApplicationError.NotFound("Cannot find any users"))
        });
});

module.exports = router;
