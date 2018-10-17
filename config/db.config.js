const mongoose = require('mongoose');

var db = {

};

db.connect = function() {
    mongoose.connect("mongodb://localhost:27017/nodeMongoDB", {
        poolSize: 4,
        useNewUrlParser: true
    })
        .then(function(err){
            console.log("successfully connected to the database!");
        }, function(err){
            console.log(err);
            console.log("Could not connect to the database! Check your connection..");
            process.exit(1);
        });
};


module.exports = db;