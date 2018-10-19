'use strict';
process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../app');
const User = require('../model/user.model');
const should = chai.should();

chai.use(chaiHttp);

/*
 Remove all users from the database
 */

let token;

before(function(done) {
    User.remove({}, (err) => {
        done();
    });
});


describe('POST /api/v1/auth/user/add', () => {
    it('it should Add a new user', (done) => {
        let user = {
            firstname: 'Ankit',
            lastname: 'Anchan',
            mobile_number: '1234567890',
            password: 'qwerty',
            is_admin: true
        };
        chai.request(server)
            .post('/api/v1/auth/user/add')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            });
        done()
    });
});

describe('POST /api/v1/auth/user/add', () => {
    it('add user without mobile number, it should return error', (done) => {
        let user = {
            firstname: 'Ankit',
            lastname: 'Anchan',
            password: 'qwerty',
            is_admin: false
        };
        chai.request(server)
            .post('/api/v1/auth/user/add')
            .send(user)
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('object');
            });
        done();
    });

});

describe('POST login and /me/info', () => {
    it('it should return token, and login with the token', (done) => {
        let requestBody = {
            username: '1234567890',
            password: 'qwerty'
        };
        chai.request(server)
            .post('/api/v1/auth/login')
            .send(requestBody)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                assert.equal(res.body.auth, true, 'Successfully Authenticated');
                token = res.body.token;
                chai.request(server)
                    .get('/api/v1/user/me/info')
                    .set('x-authorization', token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        assert.equal(res.body.mobile_number, requestBody.username, 'username for login and retrieved from token are equal');
                    });
            });

        done();
    });
});

describe('GET /api/v1/user/list', () => {
    it('it should list all users', (done) => {
        chai.request(server)
            .get('/api/v1/user/list')
            .set('x-authorization', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
            });
        done();
    });
});

describe('GET /api/v1/user/:mobile_number', () => {
    it('it should return a single user given mobile number', (done) => {
        let mobileNumber = '1234567890';
        chai.request(server)
            .get('/api/v1/user/' + mobileNumber)
            .set('x-authorization', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                assert.equal(res.body.mobile_number, mobileNumber, 'Mobile number requested matches with response mobile number');
            });
        done();
    });
});

describe('GET/:mobile_number', () => {
    it('it should return 404', (done) => {
        let mobileNumber = '0987654321';
        chai.request(server)
            .get('/api/v1/user/' + mobileNumber)
            .set('x-authorization', token)
            .end((err, res) => {
                res.should.have.status(404);
            });
        done();
    });
});


describe('GET /me/info without token', () => {
    it('it should return UnAuthorized error with status 401', (done) => {
        chai.request(server)
            .get('/api/v1/user/me/info')
            .end((err, res) => {
                res.should.have.status(401);
            });
        done();
    });
});