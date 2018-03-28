var express = require('express');
var bcrypt = require('bcryptjs');
var bodyParser= require('body-parser');

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
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthDate: req.body.birthDate,
        postalCode: req.body.postalCode,
        houseNumber: req.body.houseNumber,
        email: req.body.email,
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

module.exports = router;