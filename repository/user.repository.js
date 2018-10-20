'use strict';
const q = require('q');
const UserRepository = {};

const User = require('../model/user.model');

UserRepository.createUser = (user) => {
    var deferred = q.defer();
    user.save(function(err, _user) {
        if(err) {
            deferred.reject(err);
        }
        deferred.resolve(_user);
    });
    return deferred.promise;
};

UserRepository.getUserByMobileNumber = (mobileNumber) => {
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

UserRepository.getAllUsers = () => {
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

UserRepository.findById = (id) => {
    let deferred = q.defer();
    User.findOne({_id: id})
        .exec((err, user) => {
           if(err) {
               deferred.reject(err);
           }
           deferred.resolve(user);
        });
    return deferred.promise;
};

UserRepository.update = (id, user) => {
    let deferred = q.defer();
    User.updateOne({_id: id}, user, (err, user) => {
        if(err) {
            deferred.reject(err);
        }
        deferred.resolve(user);
    });
    return deferred.promise;
};

module.exports = UserRepository;

