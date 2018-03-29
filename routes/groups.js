var express = require('express');
var bodyParser= require('body-parser');
var JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;

var Group = require('../models/group');
var GroupSerializer = require('../serializers/groupSerializer');
var VerifyToken = require('../helpers/verifyToken');

var router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json({ type: 'application/vnd.api+json' }));

router.get('/', VerifyToken, function(req, res, next) {
    Group.find({}, function(err, groups) {
        if (err) {
            res.status(500).send("There was a problem finding the list of groups");
        }

        var jsonApi = GroupSerializer.serialize(groups);
        res.status(200).send(jsonApi);
    })
});

router.get('/:groupName', VerifyToken, function(req, res, next) {
    Group.findOne({ groupName: 
        new RegExp('^'+ req.params.groupName + '$', "i") }, 
    function(err, group) {
        if (err) {
            return res.status(500).send("There was a problem with the server.")
        }
        if (!group) {
            return res.status(404).send("No group found with " + req.params.groupName + " as it's name.")
        }

        var jsonApi = GroupSerializer.serialize(group);
        res.status(200).send(jsonApi);
    })
});

router.post('/', VerifyToken, function(req, res) {
    new JSONAPIDeserializer({ keyForAttribute: 'camelCase' }).deserialize(req.body, function(err, json) {
        if (err) {
            return res.status(500).send(
                "There was a problem with the payload."
            );
        }

        Group.create({
            groupName: json.groupName
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
});

module.exports = router;