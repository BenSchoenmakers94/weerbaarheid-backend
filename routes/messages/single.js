var Message = require('../../models/message');
var messageSerializer = require('../../serializers/messageSerializer');

module.exports = (req, res) => {
    const message = req.object;

    var jsonApi = messageSerializer.serialize(message);
    if (req.format === 'HTML') {
        res.render('messageSingle', { messages: [message]});
    } else {
    res.status(200).send(jsonapi);
    }
}