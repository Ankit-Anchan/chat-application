const config = {

};

config.dev = {
    mongo_url_string: 'mongodb://localhost:27017/nodeMongoDB',
    secret_key: '1234567890',
    port: 3535
};


config.prod = {
    mongo_url_string: '',
    secret_key: '!@#$%^&*',
    port: 3535
};

config.test = {
    mongo_url_string: 'mongodb://localhost:27017/testDB',
    secret_key: '1234567890',
    port: 3535
};

module.exports = config;