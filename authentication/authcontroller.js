var express = require('express');
var bodyParser= require('body-parser');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var config = require('../config/credentials');
var User = require('../models/user');
var VerifyToken = require('../helpers/verifyToken');

var router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/me', VerifyToken, function(req, res, next) {
        User.findById(req.userId, { password: 0 } , function(err, user) {
            if (err) {
                return res.status(500).send("There was a problem finding the user.");
            }
            if (!user) {
                return res.status(404).send("No user found.");
            }
            res.status(200).send(user);
        });
    });

//Login
router.post('/login', function(req, res) {
    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) {
            return res.status(500).send("Error on the server.\n");
        }
        if (!user) {
            return res.status(404).send("No user found.");
        }

        var passwordInvalid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordInvalid) {
            return res.status(401).send({ auth: false, token: null });
        }

        var token = jwt.sign({ id: user._id }, config.key, { expiresIn: 86400 });
        res.status(200).send({ auth: true, token: token });
    })
});
// /Login


//Logout
router.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
});
// /Logout


module.exports = router;

