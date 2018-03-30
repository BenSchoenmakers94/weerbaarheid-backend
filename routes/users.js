var express = require('express');
var bcrypt = require('bcryptjs');
var bodyParser= require('body-parser');

var User = require('../models/user');
var UserSerializer = require('../serializers/userSerializer');
var VerifyToken = require('../helpers/verifyToken');
var IsAuthorized = require('../helpers/isAuthorized');
var DeserializePayload = require('../helpers/deserializePayload');
var AttributesInPayload = require('../helpers/attributesInPayload');

var router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json({ type: 'application/vnd.api+json' }));

router.get('/', VerifyToken, function(req, res, next) {
    User.find({}, function(err, users) {
        if (err) {
            res.status(500).send("There was a problem finding the list of users");
        }

        var jsonApi = UserSerializer.serialize(users);
        res.status(200).send(jsonApi);
    })
});

router.get('/:_id', VerifyToken, function(req, res, next) {
    User.findById(new RegExp('^'+ req.params._id + '$', "i"), 
    function(err, user) {
        if (err) {
            res.status(500).send("There was a problem finding the list of users");
        }

        var jsonApi = UserSerializer.serialize(user);
        res.status(200).send(jsonApi);
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
            
            return res.status(200).send(user);
        })
});

router.post('/', DeserializePayload, function(req, res) {
    var hashedPassword = bcrypt.hashSync(req.payload.password, 8);
        User.create({
            _id: req.payload.id,
            firstName: req.payload.firstName,
            lastName: req.payload.lastName,
            birthDate: req.payload.birthDate,
            postalCode: req.payload.postalCode,
            houseNumber: req.payload.houseNumber,
            email: req.payload.email,
            password: hashedPassword
        },
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