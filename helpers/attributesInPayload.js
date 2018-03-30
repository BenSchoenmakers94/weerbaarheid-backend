function attributesInPayload(req, res, next) {
    var attributes = {};
    for (var key in req.payload) {
        attributes[key] = req.payload[key];
    }
    req.attributes = attributes;
    next();
}

module.exports = attributesInPayload;