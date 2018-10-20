'use strict';
const UserRepo = require('../repository/user.repository');
const bcrypt = require('bcryptjs');
const q = require('q');
const UserService = {};

UserService.createUser = (user) => {
    user.password = bcrypt.hashSync(user.password, 10);
    return UserRepo.createUser(user);
};

UserService.login = (username, password) => {
    var deferred = q.defer();
    UserRepo.getUserByMobileNumber(username)
        .then(function(user) {
            if(bcrypt.compareSync(password, user.password)) {
                deferred.resolve(user);
            }
            deferred.reject();
        },
        function(err) {
            deferred.reject(err);
        });
    return deferred.promise;
};

UserService.getAllUsers = () => {
    return UserRepo.getAllUsers();
};

UserService.findById = (id) => {
    return UserRepo.findById(id);
};

UserService.getUserByMobileNumber = (mobileNunber) => {
    return UserRepo.getUserByMobileNumber(mobileNunber);
};

module.exports = UserService;