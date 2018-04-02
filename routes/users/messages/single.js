var User = require('../../../models/user');
var Message = require('../../../models/message');
var ResourceSerializer = require('../../../serializers/resourceSerializer');

module.exports = (req, res) => {
    var succes = false;
    User.findById(req.object._id)
    .populate('messages')
    .exec(function(err, user) {
        if (err) {
            return res.status(500).send("There is something wrong with the server.");
        }
        Message.findById(new RegExp('^'+ req.params.messageId + '$', "i"), req.fields, function(err, message) {
            if (err) {
                return res.status(500).send("There is something wrong with the server.");
            }
            if (!message) {
                return res.status(404).send("No message found with ID.");
            }

            user.messages.forEach(messageWithUser => {
                if (messageWithUser._id === message._id) {
                    succes = true;
                }
            });

            if (succes) {
                var jsonApi = ResourceSerializer.serialize('Message', message);
                if (req.format === 'HTML') {
                    res.render('messageSingle', { messages: [message]});
                } else {
                res.status(200).send(jsonapi);
                }
            } else {
                return res.status(404).send("No message found with provided ID in provided user.");
            }
        });
    });   
}