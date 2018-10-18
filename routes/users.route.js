'use strict';
var express = require('express');
var router = express.Router();
var User = require('../model/user.model');
const jwt = require('jsonwebtoken');

var ApplicationError = require('../common/error');
var service = require('../service/user.service');
const config = require('../config/config');

/* GET users listing. */
router.post('/add', function(req, res, next) {
    const user = new User(req.body);
    service.createUser(user)
        .then(function() {
            res.send({message: 'success'});
        })
        .catch(function(err) {
            return next(new ApplicationError.InternalServerError(err));
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
    service.getUserByMobileNumber(req.params.mobile_number)
        .then(function(user) {
            res.status(200).send(user);
        })
        .catch(function(err) {
            return next(new ApplicationError.NotFound('Cannot find user'));
        });
});

router.post('/auth/login', function(req, res, next) {
    console.log('inside auth login');
    service.login(req.body.username, req.body.password)
        .then((user) => {
            var token = jwt.sign({ id: user._id }, config[process.env.NODE_ENV].secret_key, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({ auth: true, token: token });
        })
        .catch((err) => {
            return next(new ApplicationError.Unauthorized('Invalid username or password'));
        });
});

module.exports = router;
