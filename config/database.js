var mongoose = require('mongoose');
var credentials = require('./credentials');

mongoose.connect('mongodb://localhost/weerbaarheid',
    { keepAlive: 120 } , function(err) {
    if (err) {
        console.log(err);
    } else {
    }
});
