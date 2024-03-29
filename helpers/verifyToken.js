var jwt = require('jsonwebtoken');

var config = require('../config/credentials');

function verifyToken(req, res, next) {
    var token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send({ auth:false, message: "No token provided." });
    }

    token = token.split('Bearer ').pop();
    jwt.verify(token, config.key, function(err, decoded) {
        if (err) {
            return res.status(500).send({ auth:false, message: "Failed to authenticate token." });
        }

        req.currentUserId = decoded.id;
        next();
    });
}

module.exports = verifyToken;
