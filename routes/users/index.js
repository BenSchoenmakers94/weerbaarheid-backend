const users = require('express').Router();

const all = require('./all');
const single = require('./single');
const modify = require('./modify');
const create = require('./create');
const remove = require('./delete');

const VerifyToken = require('../../helpers/verifyToken');
const IsAuthorized = require('../../helpers/isAuthorized');
const HasRole = require('../../helpers/hasRole');
const ParamsEqualToSender = require('../../helpers/paramsEqualToSender');
const DeserializePayload = require('../../helpers/deserializePayload');
const AttributesInPayload = require('../../helpers/attributesInPayload');
const findObject = require('../../helpers/findObject')
const User = require('../../models/user');

users.param('userId', findObject(User));

users.get('/:userId', [VerifyToken, HasRole], single);
users.patch('/:userId', [VerifyToken, IsAuthorized, DeserializePayload, ParamsEqualToSender, AttributesInPayload], modify)
users.post('/', [DeserializePayload, AttributesInPayload], create);
users.delete('/:userId', [VerifyToken, HasRole], remove);
users.get('/', [VerifyToken, HasRole], all);

module.exports = users;

