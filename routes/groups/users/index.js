const users = require('express').Router({ mergeParams: true });

const all = require('./all');
const single = require('./single');
const add = require('./add');
const remove = require('./delete');
const create = require('./create');

const VerifyToken = require('../../../helpers/verifyToken');
const HasRole = require('../../../helpers/hasRole');
const CheckIfJSON = require('../../../helpers/checkIfJson');
const DeserializePayload = require('../../../helpers/deserializePayload');
const AttributesInPayload = require('../../../helpers/attributesInPayload'); 

const MessagesWithUser = require('./messages');

users.use('/:userId/messages', MessagesWithUser);

users.all('*', [VerifyToken, HasRole, CheckIfJSON]);

users.get('/', all);
users.get('/:userId', single);
users.post('/:userId', add);
users.delete('/:userId', remove);
users.post('/', [DeserializePayload, AttributesInPayload], create);

module.exports = users;