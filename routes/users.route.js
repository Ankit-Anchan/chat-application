'use strict';
var express = require('express');
var router = express.Router();
var User = require('../model/user.model');

var ApplicationError = require('../common/error');
var service = require('../service/user.service');

/* GET users listing. */
router.post('/add', function(req, res, next) {
    const user = new User(req.body);
    service.createUser(user)
        .then(function() {
            res.send({message: 'success'});
        })
        .catch(function(err) {

        });
});

router.post('/login', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/list', function(req, res, next) {
    service.getAllUsers()
        .then(function(users) {
            if(users.length === 0) {
                return next(new ApplicationError.NotFound('Cannot find any users'));
            }
            res.status(200).send(users);
        })
        .catch(function(err) {
            return next(new ApplicationError.InternalServerError(err));
        });
});

router.get('/:mobile_number', function(req, res, next) {
    res.send('respond with a resource');1
});


module.exports = router;
