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

before(function(done) {
    User.remove({}, (err) => {
        done();
    });
});

describe('POST /user/add', () => {
    it('it should Add a new user', (done) => {
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
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            });
        done()
    });
});


describe('GET /user/list', () => {
    it('it should list all users', (done) => {
        chai.request(server)
            .get('/user/list')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
            });
        done();
    });
});

describe('GET /user/:mobile_number', () => {
    it('it should return a single user given mobile number', (done) => {
        let mobileNumber = '1234567890';
        chai.request(server)
            .get('/user/' + mobileNumber)
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
            .get('/user/' + mobileNumber)
            .end((err, res) => {
                res.should.have.status(404);
            });
        done();
    });
});

describe('POST /user/add', () => {
    it('add user without mobile number, it should return error', (done) => {
        let user = {
            firstname: 'Ankit',
            lastname: 'Anchan',
            password: 'qwerty',
            is_admin: false
        };
        chai.request(server)
            .post('/user/add')
            .send(user)
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('object');
            });
        done();
    });

});


describe('POST', () => {
    it('it should return token', (done) => {
        let requestBody = {
            username: '1234567890',
            password: 'qwerty'
        };
        chai.request(server)
            .post('/user/auth/login')
            .send(requestBody)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                assert.equal(res.body.auth, true, 'Successfully Authenticated');
            });
        done();
    });
});