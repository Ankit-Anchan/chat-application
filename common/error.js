'use strict';

class ApplicationError extends Error {
    constructor(message, status) {
        super();

        Error.captureStackTrace(this, this.constructor);

        // this.name = this.constructor.name;
        this.name = this.constructor.name;
        this.message = message ||
            'Something went wrong. Please try again.';

        this.status = status || 500;
    }
}

// 400 Bad Request
class BadRequest extends ApplicationError {
    constructor(message) {
        super(message, 400);
    }
}

// 401 Unauthorized
class Unauthorized extends ApplicationError {
    constructor(message) {
        super(message, 401);
    }
}

// 403 Forbidden
class Forbidden extends ApplicationError {
    constructor(message) {
        super(message, 403);
    }
}

// 404 Not Found
class NotFound extends ApplicationError {
    constructor(message) {
        super(message, 404);
    }
}

// 409 Conflict
class Conflict extends ApplicationError {
    constructor(message) {
        super(message, 409);
    }
}

// 422 Unprocessable Entity
class UnprocessableEntity extends ApplicationError {
    constructor(message) {
        super(message, 402);
    }
}

// 500 Internal Server Error
class InternalServerError extends ApplicationError {
    constructor(message) {
        super(message, 500);
    }
}


module.exports.ApplicationError = ApplicationError;
module.exports.BadRequest = BadRequest;
module.exports.Unauthorized = Unauthorized;
module.exports.Forbidden = Forbidden;
module.exports.NotFound = NotFound;
module.exports.Conflict = Conflict;
module.exports.UnprocessableEntity = UnprocessableEntity;
module.exports.InternalServerError = InternalServerError;