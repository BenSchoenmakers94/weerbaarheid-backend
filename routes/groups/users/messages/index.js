const messages = require('express').Router({ mergeParams: true });

const all = require('./all');
const single = require('./single');
const create = require('./create');

const VerifyToken = require('../../../../helpers/verifyToken');
const IsAuthorized = require('../../../../helpers/isAuthorized');
const HasRole = require('../../../../helpers/hasRole');
const CheckIfJSON = require('../../../../helpers/checkIfJson');
const DeserializePayload = require('../../../../helpers/deserializePayload');
const AttributesInPayload = require('../../../../helpers/attributesInPayload'); 

messages.all('*', [VerifyToken, HasRole, CheckIfJSON]);

messages.get('/',  IsAuthorized, all);
messages.get('/:messageId', IsAuthorized, single);
messages.post('/', [DeserializePayload, AttributesInPayload], create);

module.exports = messages;