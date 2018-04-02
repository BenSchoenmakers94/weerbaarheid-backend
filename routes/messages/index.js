const messages = require('express').Router();

const all = require('./all');
const single = require('./single');

const VerifyToken = require('../../helpers/verifyToken');
const HasRole = require('../../helpers/hasRole');
const CheckIfJSON = require('../../helpers/checkIfJson');
const findObject = require('../../helpers/findObject')
const Message = require('../../models/message');

messages.param('messageId', findObject(Message));

messages.all('*', CheckIfJSON);

messages.get('/', [VerifyToken, HasRole], all);
messages.get('/:messageId', [VerifyToken, HasRole], single);

module.exports = messages;

