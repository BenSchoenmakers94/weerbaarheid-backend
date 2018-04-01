var express = require('express');
var bodyParser= require('body-parser');

var Group = require('../models/group');
var GroupSerializer = require('../serializers/groupSerializer');
var VerifyToken = require('../helpers/verifyToken');
var DeserializePayload = require('../helpers/deserializePayload');
var AttributesInPayload = require('../helpers/attributesInPayload');
var addUserToGroup = require('../helpers/addUserToGroup');

var router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json({ type: 'application/vnd.api+json' }));

router.get('/', VerifyToken, function(req, res, next) {
    Group.find()
    .populate('users')
    .exec(function(err, groups) {
        if (err) {
            return res.status(500).send("There was a problem finding the list of groups");
        }

        var jsonApi = GroupSerializer.serialize(groups);
        res.status(200).send(jsonApi);
    }); 
});

router.get('/:_id', VerifyToken, function(req, res, next) {
    Group.findOne({ _id: 
        new RegExp('^'+ req.params._id + '$', "i") }, 
    function(err, group) {
        if (err) {
            return res.status(500).send("There was a problem with the server.")
        }
        if (!group) {
            return res.status(404).send("No group found with " + req.params._id + " as it's name.")
        }
    })
    .populate('users')
    .exec(function(err, group) {
        var jsonApi = GroupSerializer.serialize(group);
        res.status(200).send(jsonApi);
    });
});

router.post('/', [VerifyToken, DeserializePayload], function(req, res) {
    Group.create({
        _id: req.payload.id,
        users: req.payload.users
    },
    function(err, group) {
        if (err) {
            return res.status(422).send(
                err.message
            );
        }

        var jsonApi = GroupSerializer.serialize(group);
        res.status(201).send(jsonApi);
    });
});

router.patch('/:_id', [VerifyToken, DeserializePayload], function(req, res) {
    if(!req.payload[0].users[0].id) {
        return res.status(422).send('Missing user information in body.');
    }
    addUserToGroup(res, req.payload[0].users[0].id, req.params._id).then(function(group) {
        Group.findById(group._id)
        .populate('users')
        .exec(function(err, popGroup) {
        var jsonapi = GroupSerializer.serialize(popGroup);
        return res.status(200).send(jsonapi);
        });
    }, function(error){});
});

module.exports = router;