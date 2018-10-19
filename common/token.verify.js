'use strict';
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const ApplicationError = require('./error');

const verifyToken = (req, res, next) => {
    const token = req.headers['x-authorization'];
    if(!token) {
        return next(new ApplicationError.Unauthorized("Token is missing."))
    }

    jwt.verify(token, config[process.env.NODE_ENV].secret_key, function(err, decoded) {
        if (err) {
            return next(new ApplicationError.Unauthorized("Failed to authenticate token."));
        }
        // if everything good, save to request for use in other routes
        req.username = decoded.username;
        req.id = decoded.id;
        next();
    });
};

module.exports = verifyToken;