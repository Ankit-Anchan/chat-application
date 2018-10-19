'use strict';
process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../app');
const User = require('../model/user.model');
const Contact = require('../model/contact-list.model');
chai.use(chaiHttp);


before('', function(done) {
    User.remove({}, function(err) {
        done();
    });

});