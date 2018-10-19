'use strict';
var express = require('express');
var router = express.Router();
var User = require('../model/user.model');
const jwt = require('jsonwebtoken');

var ApplicationError = require('../common/error');
var service = require('../service/user.service');
const config = require('../config/config');

/* GET users listing. */
router.post('/add', (req, res, next) => {
    const user = new User(req.body);
    service.createUser(user)
        .then(() => {
            res.send({message: 'success'});
        })
        .catch((err) => {
            return next(new ApplicationError.InternalServerError(err));
        });
});

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

router.post('/auth/login', (req, res, next) => {
    service.login(req.body.username, req.body.password)
        .then((user) => {
            console.log(user);
            var token = jwt.sign({ id: user.mobile_number }, config[process.env.NODE_ENV].secret_key, {
                expiresIn: 604800 // expires in 24 hours
            });
            res.status(200).send({ auth: true, token: token });
        })
        .catch((err) => {
            return next(new ApplicationError.Unauthorized('Invalid username or password.'));
        });
});

router.get('/auth/me', (req, res, next) => {
    console.log(req.headers);
    const token = req.headers['x-authorization'];
    console.log(token);
    if(!token) {
        return next(new ApplicationError.Unauthorized("Token is missing."))
    }
    jwt.verify(token, config[process.env.NODE_ENV].secret_key, (err, decoded) => {
        if(err) {
            return next(new ApplicationError.Unauthorized("Token provided is invalid."))
        }
        console.log(decoded);
        service.getUserByMobileNumber(decoded.id)
            .then((user) => {
                res.status(200).send(user);
            })
            .catch((err) => {
                return next(new ApplicationError.Unauthorized("There was a problem finding the user."))
            });
    });
});

module.exports = router;
