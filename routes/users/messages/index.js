const messages = require('express').Router({ mergeParams: true });

const all = require('./all');
const single = require('./single');
const create = require('./create');

const VerifyToken = require('../../../helpers/verifyToken');
const IsAuthorized = require('../../../helpers/isAuthorized');
const CheckIfJSON = require('../../../helpers/checkIfJson');
const DeserializePayload = require('../../../helpers/deserializePayload');
const AttributesInPayload = require('../../../helpers/attributesInPayload'); 

messages.all('*', CheckIfJSON);

messages.get('/', [VerifyToken, IsAuthorized], all);
messages.get('/:userId', [VerifyToken, IsAuthorized], single);
messages.post('/', [VerifyToken, IsAuthorized, DeserializePayload, AttributesInPayload], create);

module.exports = messages;