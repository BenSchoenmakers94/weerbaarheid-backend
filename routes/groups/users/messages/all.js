var User = require('../../../../models/user');
var MessageSerializer = require('../../../../serializers/messageSerializer');

module.exports = (req, res) => {
    User.findById(req.userId, function(err, user) {
        if (err) {
            return res.status(500).send("There was a problem with the server.");
        }
        if (!user) {
            return res.status(404).send("User does not exist in group.");
        }
    })
    .populate('messages')
    .exec(function(err, user) {
        var jsonapi = MessageSerializer.serialize(user.messages);
        res.status(200).send(jsonapi);
    })
  };