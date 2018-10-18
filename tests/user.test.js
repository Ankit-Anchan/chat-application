'use strict';
process.env.NODE_ENV = 'test';
const UserRepo = require('../repository/user.repository');
const chai = require('chai');
const chaiHttp = require('chai-http');
let should = chai.should();

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


describe('/POST it should Add a new user', function() {
    it('', function(done) {
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


describe('/GET it should list all users', function(done) {
    chai.request(server)
        .get('/user/list')
        .end(function(err, res) {
            console.log(res.body);
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1);
        });
});