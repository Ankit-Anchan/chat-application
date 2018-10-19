'use strict';
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users.route');
const authRouter = require('./routes/auth.route');
const contactRouter = require('./routes/contact.route');
const connection = require('./config/db.config');
const ApplicationError = require('./common/error');
const ErrorHandler = require('./common/error-middleware');
const verifyToken = require('./common/token.verify');

connection.connect();

var app = express();
var port = process.env.PORT || 8080;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/', indexRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', verifyToken, usersRouter);
app.use('/api/v1/user/contact', verifyToken, contactRouter);

app.use('*', (req, res, next) => {
    const error = new ApplicationError.NotFound('Not Found');
    error.statusCode = 404;
    next(error);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const error = new ApplicationError.NotFound('Not Found');
    error.statusCode = 404;
    next(error);
});

// error handler
app.use(ErrorHandler);

app.listen(port, () => {
   console.log('Server started on port: ' + port);
});

module.exports = app;