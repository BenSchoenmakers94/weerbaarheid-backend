var express = require('express');
var bcrypt = require('bcryptjs');
var bodyParser= require('body-parser');

var Message = require('../models/message');
var User = require('../models/user');
var messageSerializer = require('../serializers/messageSerializer');
var VerifyToken = require('../helpers/verifyToken');
var IsAuthorized = require('../helpers/isAuthorized');
var DeserializePayload = require('../helpers/deserializePayload');
var AttributesInPayload = require('../helpers/attributesInPayload');

var router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json({ type: 'application/vnd.api+json' }));

router.all('*', VerifyToken);

router.get('/', function(req, res, next) {
    Message.find({}, function(err, messages) {
        if (err) {
            return res.status(500).send("There was a problem finding the list of messages.");
        }
        if (!messages) {
            return res.status(404).send("No messages found.");
        }

        var jsonApi = messageSerializer.serialize(messages);
        res.status(200).send(jsonApi);
    })
});

router.get('/:_id', function(req, res, next) {
    Message.findById(new RegExp('^'+ req.params._id + '$', "i"), 
    function(err, message) {
        if (err) {
            return res.status(500).send("There was a problem finding the list of messages.");
        }
        if (!message) {
            return res.status(404).send("There exists no record of message with id: " + req.params._id + ".");
        }

        var jsonApi = messageSerializer.serialize(message);
        res.status(200).send(jsonApi);
    });
});

router.delete('/:_id', function(req, res, next) {
    Message.deleteOne({ _id: req.params._id }, function(err) {
        if (err) {
            res.status(404).send("There exists no record of a message with id: " + req.params._id + ".");
        }
    })
});

router.post('/', DeserializePayload, AttributesInPayload, function(req, res) {
        Message.create(
            req.attributes,
            function(err, message) {
                if (err) {
                    return res.status(422).send(
                        err.message
                    );
                }
                    var jsonApi = messageSerializer.serialize(message);
                    res.status(201).send(jsonApi);
            });
});

module.exports = router;