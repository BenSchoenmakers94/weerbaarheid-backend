var Message = require('../../models/message');
var messageSerializer = require('../../serializers/messageSerializer');

module.exports = (req, res) => {
    const message = req.object;

    var jsonApi = messageSerializer.serialize(message);
    res.status(200).send(jsonApi);
}