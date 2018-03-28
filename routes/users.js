var express = require('express');
var bcrypt = require('bcryptjs');
var bodyParser= require('body-parser');
var JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;

var User = require('../models/user');
var UserSerializer = require('../serializers/userSerializer');
var VerifyToken = require('../helpers/verifyToken');

var router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/', VerifyToken, function(req, res, next) {
    User.find({}, function(err, users) {
        if (err) {
            res.status(500).send("There was a problem finding the list of users");
        }

        var jsonApi = UserSerializer.serialize(users);
        res.status(200).send(jsonApi);
    })
});

router.post('/', function(req, res) {

    new JSONAPIDeserializer({ keyForAttribute: 'camelCase' }).deserialize(req.body, function(err, json) {
        if (err) {
            return res.status(500).send(
                "There was a problem with the payload."
            );
        }
        console.log(json);
        var hashedPassword = bcrypt.hashSync(json.password, 8);
        User.create({
            firstName: json.firstName,
            lastName: json.lastName,
            birthDate: json.birthDate,
            postalCode: json.postalCode,
            houseNumber: json.houseNumber,
            email: json.email,
            password: hashedPassword
        },
        function(err, user) {
            if (err) {
                return res.status(500).send(
                    "There was a problem with registering the user."
                );
            }
                var jsonApi = UserSerializer.serialize(user);
                res.status(201).send(jsonApi);
        });
    });
});

module.exports = router;