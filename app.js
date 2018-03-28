var express = require('express');

var app = express();

//Init
require('./config/credentials');
require('./config/database');
// /Init


//Models
require('./models/user');
//require('./models/group');
//require('./models/fillTestData');
// /Models

//Authentication
var authController = require('./authentication/authcontroller');
app.use('/api/auth', authController);
// /Authentication

var userRoute = require('./routes/users');
app.use('/users', userRoute);
 
module.exports = app;
