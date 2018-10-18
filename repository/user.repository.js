'use strict';
const q = require('q');
const UserRepository = {};

const User = require('../model/user.model');

UserRepository.createUser = function(user) {
    var deferred = q.defer();
    user.save(function(err, _user) {
        if(err) {
            deferred.reject(err);
        }
        deferred.resolve(_user);
    });
    return deferred.promise;
};

UserRepository.getUserByMobileNumber = function(mobileNumber) {
    var deferred = q.defer();
    User.findOne({mobile_number: mobileNumber})
        .lean()
        .exec(function(err, user) {
            if(!user) {
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

