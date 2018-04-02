var express = require('express');
var queryHandler = require('express-api-queryhandler');
var cors = require('cors');
var app = express();

app.use(cors());
app.set('view engine', 'pug')
app.use(queryHandler.fields());
app.use(queryHandler.filter());
app.use(queryHandler.pagination({limit: 25}));
app.use(queryHandler.sort());

//Init
require('./config/credentials');
require('./config/database');
// /Init


//Routes
const routes = require('./routes');
app.use('/', routes);
// /Routes

module.exports = app;
