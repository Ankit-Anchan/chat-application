'use strict';
var ApplicationError = require('./error');
var ErrorHandler = function(error, req, res, next) {
    console.log(error);
    // check the type of the error thrown and set status code accordingly
    var statusCode = error.statusCode;
    if (error instanceof ApplicationError.NotFound)
        statusCode = 404;
    if (error instanceof ApplicationError.BadRequest)
        statusCode = 400;
    if (error instanceof ApplicationError.Conflict)
        statusCode = 409;
    if (error instanceof ApplicationError.Forbidden)
        statusCode = 403;
    if (error instanceof ApplicationError.InternalServerError)
        statusCode = 500;
    res.status(statusCode || 500);
    var response = { timestamp: Date.now() };
    response.message = error.message;
    response.status = statusCode;
    response.path = req.path;
    response.exception = error.name;
    res.json(response);
};


module.exports = ErrorHandler;