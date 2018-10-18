'use strict';
process.env.NODE_ENV = 'test';
const UserRepo = require('../repository/user.repository');
const chai = require('chai');
const chaiHttp = require('chai-http');
let should = chai.should();
const assert = chai.assert;
const server = require('../app');
const User = require('../model/user.model');

chai.use(chaiHttp);

/*
 Remove all users from the database
 */

describe('Users', function() {
    beforeEach(function(done) {
        User.remove({}, (err) => {
            done();
        });
    });
});


describe('POST /user/add', function() {
    it('it should Add a new user', function(done) {
        let user = {
            firstname: 'Ankit',
            lastname: 'Anchan',
            mobile_number: '1234567890',
            password: 'qwerty',
            is_admin: true

        };
        chai.request(server)
            .post('/user/add')
            .send(user)
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
            });
        done();
    });

});


describe('GET /user/list', function(done) {
    it('it should list all users', function(done) {
        chai.request(server)
            .get('/user/list')
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
            });
        done();
    });
});

describe('GET /user/:mobile_number', function() {
    it('it should return a single user given mobile number', function(done) {
        let mobileNumber = '1234567890';
        chai.request(server)
            .get('/user/' + mobileNumber)
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                assert.equal(res.body.mobile_number, mobileNumber, 'Mobile number requested matches with response mobile number');
            });
        done();
    });
});

describe('GET/:mobile_number', function() {
    it('it should return 404', function(done) {
        let mobileNumber = '0987654321';
        chai.request(server)
            .get('/user/' + mobileNumber)
            .end(function(err, res) {
                res.should.have.status(404);
            });
        done();
    });
});

describe('POST /add ', function() {
    it('add user without mobile number, it should return error', function(done) {
        let user = {
            firstname: 'Ankit',
            lastname: 'Anchan',
            password: 'qwerty',
            is_admin: false
        };
        chai.request(server)
            .post('/user/add')
            .send(user)
            .end(function(err, res) {
                res.should.have.status(500);
                res.body.should.be.a('object');
            });
        done();
    });

});