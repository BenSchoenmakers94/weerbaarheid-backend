var Message = require('../../models/message');
var messageSerializer = require('../../serializers/messageSerializer');

module.exports = (req, res) => {
    Message.find({}, function(err, messages) {
        if (err) {
            return res.status(500).send("There was a problem finding the list of message.");
        }
        if (!messages) {
            return res.status(404).send("No messages found.");
        }

        var jsonApi = messageSerializer.serialize(messages);
        if (req.format === 'HTML') {
            res.render('messageSingle', { messages: messages});
        } else {
        res.status(200).send(jsonapi);
        }
    });
}