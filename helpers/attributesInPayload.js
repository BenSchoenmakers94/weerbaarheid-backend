var bcrypt = require('bcryptjs');

function attributesInPayload(req, res, next) {
    var attributes = {};
    for (var key in req.payload) {
        if (key === 'password') {
            var hashedPassword = bcrypt.hashSync(req.payload.password, 8);
            attributes[key] = hashedPassword;
        } else {
            attributes[key] = req.payload[key];
        }
    }
    req.attributes = attributes;
    next();
}

module.exports = attributesInPayload;

