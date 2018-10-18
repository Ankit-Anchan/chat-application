const UserRepo = require('../repository/user.repository');
const bcrypt = require('bcryptjs');
const UserService = {};

UserService.createUser = function(user) {
    console.log(user);
    user.password = bcrypt.hashSync(user.password, 10);
    return UserRepo.createUser(user);
};

UserService.login = function(username, password) {
    var deferred = q.defer();
    UserRepo.getUserByMobileNumber(username)
        .then(function(user) {
            if(bcrypt.compareSync(user.password, password)) {
                deferred.resolve(user);
            }
            deferred.reject(username);
        },
        function(err) {
            deferred.reject(err);
        });
    return deferred.promise;
};

UserService.getAllUsers = function() {
    return UserRepo.getAllUsers();
};


module.exports = UserService;