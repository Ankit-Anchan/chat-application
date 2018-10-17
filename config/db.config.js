const mongoose = require('mongoose');
const config = require('./config');

var db = {

};

db.connect = function() {
    mongoose.connect(config[process.env.NODE_ENV].mongo_url_string, {
        poolSize: 4,
        useNewUrlParser: true
    })
    .then(function() {
        console.log("successfully connected to the database!");
    },
    function(err) {
        console.log(err);
        console.log("Could not connect to the database! Check your connection..");
        process.exit(1);
    });
};


module.exports = db;