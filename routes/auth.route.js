const router = require('express').Router();
const jwt = require('jsonwebtoken');

let User = require('../model/user.model');
const config = require('../config/config');
const service = require('../service/user.service');
const ApplicationError = require('../common/error');

router.post('/user/add', (req, res, next) => {
    const user = new User(req.body);
    service.createUser(user)
        .then((_user) => {
            console.log(user.mobile_number);
            console.log(user.password);
            console.log(req.body.password);
            console.log(_user);
            service.login(user.mobile_number, req.body.password)
                .then((user) => {
                    const token = jwt.sign({ id: user._id,username: user.mobile_number }, config[process.env.NODE_ENV].secret_key, {
                        expiresIn: 604800 // expires in 24 hours
                    });
                    res.status(200).send({ auth: true, token: token });
                })
                .catch(err => {
                    return next(new ApplicationError.Unauthorized('Invalid username or password.'));
                });
        })
        .catch((err) => {
            return next(new ApplicationError.InternalServerError(err));
        });
});

router.post('/login', (req, res, next) => {
    service.login(req.body.username, req.body.password)
        .then((user) => {
            const token = jwt.sign({ id: user._id,username: user.mobile_number }, config[process.env.NODE_ENV].secret_key, {
                expiresIn: 604800 // expires in 24 hours
            });
            res.status(200).send({ auth: true, token: token });
        })
        .catch((err) => {
            return next(new ApplicationError.Unauthorized('Invalid username or password.'));
        });
});

module.exports = router;