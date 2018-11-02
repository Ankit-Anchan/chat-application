'use strict';
process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const bcrypt = require('bcryptjs');
const should = chai.should();

const server = require('../app');
const User = require('../model/user.model');
const Contact = require('../model/contact.model');
const assert = chai.assert;
chai.use(chaiHttp);

before('', function(done) {
    User.remove({},(err) => {
        Contact.remove({}, (err) => {
            var user1 = new User({firstname: 'Issac', lastname: 'Newton', mobile_number: '2222222222', password: bcrypt.hashSync('pass123',10), is_admin: false});
            user1.save((err, _user) => {});
            var user2 = new User({firstname: 'Albert', lastname: 'Einstein', mobile_number: '1111111111', password: bcrypt.hashSync('pass123',10), is_admin: false});
            user2.save((err, _user) => {});
            done();
        });
    });
});

// beforeEach('', (done) => {
//     chai.request(server)
//         .post('/api/v1/auth/login')
//         .send({username: '1234567890', password: 'qwerty'})
//         .end((err, res) => {
//             console.log("got the token");
//             token = res.body.token;
//             console.log('token = ' + token);
//             done();
//         });
// });

let userToken;

describe('POST /api/v1/contact/request/send', function() {
    it('User ', function(done) {
        let requestPayload = {
            sent_to: '',
        };
        let requestBody = {
            username: '1111111111',
            password: 'pass123'
        };
        let user2Token;
        chai.request(server)
            .post('/api/v1/auth/login')
            .set('content-type', 'application/json')
            .send(requestBody)
            .end((err, res) => {
                console.log(res.body);
                let token = res.body.token;
                userToken = token;
                chai.request(server)
                .post('/api/v1/auth/login')
                .set('content-type', 'application/json')
                .send({username: '2222222222', password: 'pass123'})
                .end((err, res) => {
                    user2Token = res.body.token;
                    chai.request(server)
                    .get('/api/v1/user/me/info')
                    .set('x-authorization', user2Token)
                    .end((err,res) => {
                        let user2 = res.body;
                        chai.request(server)
                            .get('/api/v1/user/1111111111')
                            .set('x-authorization', token)
                            .end((err, res) => {
                                let user1 = res.body;
                                requestPayload.sent_to = user1._id;
                                chai.request(server)
                                    .post('/api/v1/contact/request/send')
                                    .set('x-authorization', user2Token)
                                    .send(requestPayload)
                                    .end((err, res) => {
                                        res.should.have.status(200);
                                        res.body.should.be.a('object');
                                        done();
                                    });
                            });
                    });
                });
            });
    });
});


describe('GET /request/pending and POST /request/accept/:id' , () => {
    it('first get list of pending request and accept one request from the list', (done) => {
        console.log('getting pending request and accepting');
        console.log('token = ' + userToken);
        chai.request(server)
            .get('/api/v1/contact/request/pending')
            .set('x-authorization', userToken)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                let pendingRequests = res.body;
                assert.equal(pendingRequests.length, 1, 'Pending Request list length is equal to 1');
                chai.request(server)
                    .post('/api/v1/contact/request/accept/' + pendingRequests[0]._id)
                    .set('x-authorization', userToken)
                    .end((err, res) => {
                        res.should.have.status(200);
                        done();
                    });
            });
    })
});

describe('GET /contact/list', () => {
    it('it should list contacts who have accepted request', (done) => {
        console.log('getting contact list');
        console.log('token = ' + userToken);
        chai.request(server)
            .get('/api/v1/contact/list')
            .set('x-authorization', userToken)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });
});