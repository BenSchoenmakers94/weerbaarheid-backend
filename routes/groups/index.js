const groups = require('express').Router();

const all = require('./all');
const single = require('./single');

const VerifyToken = require('../../helpers/verifyToken');
const IsAuthorized = require('../../helpers/isAuthorized');
const HasRole = require('../../helpers/hasRole');
const DeserializePayload = require('../../helpers/deserializePayload');
const AttributesInPayload = require('../../helpers/attributesInPayload');
const findObject = require('../../helpers/findObject')
const Group = require('../../models/group');

const UsersInGroup = require('./users');

groups.param('groupId', findObject(Group));

groups.use('/:groupId/users', UsersInGroup);

groups.all('*', [VerifyToken, HasRole]);
groups.get('/:groupId', single);
groups.get('/', all);

module.exports = groups;

