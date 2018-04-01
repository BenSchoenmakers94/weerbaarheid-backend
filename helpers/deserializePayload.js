var JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;

function deserializePayload(req, res, next) {
    new JSONAPIDeserializer({ keyForAttribute: 'camelCase' }).deserialize(req.body, function(err, json) {
        if (err) {
            return res.status(500).send(
                "There was a problem with the payload."
            );
        }
        
        req.payload = json;
        next();
    });
}

module.exports = deserializePayload;