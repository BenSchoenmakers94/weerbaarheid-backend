var mongoose = require('mongoose');

//Database Connection
mongoose.connect('mongodb://localhost:27017/weerbaarheid', function(err) {
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
