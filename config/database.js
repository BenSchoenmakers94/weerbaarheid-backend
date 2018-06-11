var mongoose = require('mongoose');
var credentials = require('./credentials');

mongoose.connect('mongodb://localhost:27017/weerbaarheid', 
    { keepAlive: 120 } , function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connection Successful!');
    }
});
