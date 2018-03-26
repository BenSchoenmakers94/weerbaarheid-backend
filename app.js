var mongoose = require('mongoose');

//Credentials
var userName = 'theShoemaker';
var passWord = 'Ubuntu1'
// /Credentials

//Database Connection
mongoose.connect('mongodb://' + userName + ':' + passWord + '@ds038547.mlab.com:38547/weerbaarheid', 
    { keepAlive: 120 } , function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connection Successful!');
    }
});
// /Database Connection

//Models
require('./models/user');
require('./models/fillTestData');
// /Models
