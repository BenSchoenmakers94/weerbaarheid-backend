var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());

//Init
require('./config/credentials');
require('./config/database');
// /Init


//Models
require('./models/user');
require('./models/group');
//require('./models/fillTestData');
// /Models

//Authentication
var authController = require('./authentication/authcontroller');
app.use('/', authController);
// /Authentication

var userRoute = require('./routes/users');
app.use('/users', userRoute);
 
var groupRoute = require('./routes/groups');
app.use('/groups', groupRoute);

var messageRoute = require('./routes/messages');
app.use('/messages', messageRoute);

module.exports = app;
