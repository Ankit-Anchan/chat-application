'use strict';
process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const bcrypt = require('bcryptjs');
const should = chai.should();

const server = require('../app');
const User = require('../model/user.model');
const Contact = require('../model/contact.model');
chai.use(chaiHttp);

before('', function(done) {
    User.remove({},(err) => {

    });
    var user1 = new User({firstname: 'Issac', lastname: 'Newton', mobile_number: '2222222222', password: bcrypt.hashSync('pass123',10), is_admin: false});
    user1.save((err, _user) => {});
    var user2 = new User({firstname: 'Albert', lastname: 'Einstein', mobile_number: '1111111111', password: bcrypt.hashSync('pass123',10), is_admin: false});
    user2.save((err, _user) => {});
    done();
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

describe('POST /api/v1/contact/request/send', function() {
    it('User ', function(done) {
        let user1;
        let user2;
        let requestPayload = {
            sent_to: '',
        };
        let requestBody = {
            username: '1111111111',
            password: 'pass123'
        };
        chai.request(server)
            .post('/api/v1/auth/login')
            .set('content-type', 'application/json')
            .send(requestBody)
            .end((err, res) => {
                console.log(res.body);
                let token = res.body.token;
                chai.request(server)
                    .get('/api/v1/user/2222222222')
                    .set('x-authorization', token)
                    .end((err,res) => {
                        user1 = res.body;
                        requestPayload.sent_to = user1._id;
                        console.log('payload');
                        console.log(user1);
                        console.log(requestPayload);
                        chai.request(server)
                            .get('/api/v1/user/1111111111')
                            .set('x-authorization', token)
                            .end((err, res) => {
                                user2 = res.body;
                                chai.request(server)
                                    .post('/api/v1/contact/request/send')
                                    .set('x-authorization', token)
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