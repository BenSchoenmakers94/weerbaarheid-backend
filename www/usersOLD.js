var express = require('express');
var bcrypt = require('bcryptjs');
var bodyParser= require('body-parser');

var User = require('../models/user');
var UserSerializer = require('../serializers/userSerializer');
var VerifyToken = require('../helpers/verifyToken');
var IsAuthorized = require('../helpers/isAuthorized');
var DeserializePayload = require('../helpers/deserializePayload');
var AttributesInPayload = require('../helpers/attributesInPayload');
var HasRole = require('../helpers/hasRole');

var addUserToGroup = require('../helpers/addUserToGroup');

var router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json({ type: 'application/vnd.api+json' }));

router.get('/', VerifyToken, function(req, res, next) {
    User.find({}, function(err, users) {
        if (err) {
            return res.status(500).send("There was a problem finding the list of users.");
        }
        if (!users) {
            return res.status(404).send("No users found.");
        }

        var jsonApi = UserSerializer.serialize(users);
        res.status(200).send(jsonApi);
    })
});

router.get('/:_id', VerifyToken, function(req, res, next) {
    User.findById(new RegExp('^'+ req.params._id + '$', "i"), 
    function(err, user) {
        if (err) {
            return res.status(500).send("There was a problem finding the list of users.");
        }
        if (!user) {
            return res.status(404).send("There exists no record of user with id: " + req.params._id + ".");
        }

        var jsonApi = UserSerializer.serialize(user);
        res.status(200).send(jsonApi);
    });
});

router.delete('/:_id', HasRole, function(req, res, next) {
    User.deleteOne({ _id: req.params._id }, function(err) {
        if (err) {
            res.status(404).send("There exists no record of a user with id: " + req.params._id + ".");
        }
    })
});

router.patch('/:_id', [VerifyToken, IsAuthorized, DeserializePayload, AttributesInPayload], function(req, res, next) {
    User.findByIdAndUpdate(
        new RegExp('^'+ req.params._id + '$', "i"),
        {$set: req.attributes},
        { new: true, runValidators: true },
        function(err, user) {
            if (err) {
                return res.status(422).send(
                    "There was a problem with updating user " + req.params._id + ".\n Message: " + err
                );
            }
            if (!user) {
                return res.status(404).send("There exists no record of user with id: " + req.params._id + ".");
            }

            var jsonapi = UserSerializer.serialize(user)
            return res.status(200).send(jsonapi);
        })
});

router.post('/', [DeserializePayload, AttributesInPayload], function(req, res) {
    var hashedPassword = bcrypt.hashSync(req.payload.password, 8);
    req.attributes['_id'] = req.payload.id;
    req.attributes['password'] = hashedPassword;
        
        User.create(
            req.attributes,
            function(err, user) {
                if (err) {
                    return res.status(422).send(
                        err.message
                    );
                }
                    var jsonApi = UserSerializer.serialize(user);
                    res.status(201).send(jsonApi);
            });
});

module.exports = router;