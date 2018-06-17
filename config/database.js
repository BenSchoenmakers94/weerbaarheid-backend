var mongoose = require('mongoose');
var credentials = require('./credentials');

mongoose.connect('mongodb://' + credentials.userName + ':' + credentials.passWord + '@ds038547.mlab.com:38547/weerbaarheid',
    { keepAlive: 120 } , function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connection Successful!');
    }
});
