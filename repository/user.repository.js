'use strict';
const q = require('q');
const UserRepository = {};

const User = require('../model/user.model');

UserRepository.createUser = function(user) {
    var deferred = q.defer();
    user.save(function(err, ) {
        if(err) {
            deferred.reject(err);
        }
        deferred.resolve(user);
    });
    return deferred.promise;
};

UserRepository.getUserByMobileNumber = function(mobileNumber) {
    User.findOne({mobile_number: mobileNumber})
        .lean()
        .exec(function(err, user) {
            if(err) {
                deferred.reject(err);
            }
            deferred.resolve(user);
        });
    return deferred.promise;
};

UserRepository.getAllUsers = function() {
    var deferred = q.defer();
    User.find({}, null, {})
        .lean()
        .exec(function(err, users) {
            if(err) {
                deferred.reject(err);
            }
            deferred.resolve(users);
        });
    return deferred.promise;
};



module.exports = UserRepository;

