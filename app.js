var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());

//Init
require('./config/credentials');
require('./config/database');
// /Init


//Routes
const routes = require('./routes');
app.use('/', routes);
// /Routes

module.exports = app;
