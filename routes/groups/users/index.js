const users = require('express').Router({ mergeParams: true });

const all = require('./all');
const single = require('./single');
const add = require('./add');
const remove = require('./delete');
const create = require('./create');

const VerifyToken = require('../../../helpers/verifyToken');
const HasRole = require('../../../helpers/hasRole');
const DeserializePayload = require('../../../helpers/deserializePayload');
const AttributesInPayload = require('../../../helpers/attributesInPayload'); 

const MessagesWithUser = require('./messages');

users.use('/:userId/messages', MessagesWithUser);

users.get('/', [VerifyToken, HasRole], all);
users.get('/:userId', [VerifyToken, HasRole], single);
users.post('/:userId', [VerifyToken, HasRole], add);
users.delete('/:userId', [VerifyToken, HasRole], remove);
users.post('/', [VerifyToken, HasRole, DeserializePayload, AttributesInPayload], create);

module.exports = users;