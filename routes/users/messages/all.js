var User = require('../../../models/user');
var MessageSerializer = require('../../../serializers/messageSerializer');

module.exports = (req, res) => {
    User.findById(req.object._id)
    .populate('messages')
    .exec(function(err, user) {
        var jsonapi = MessageSerializer.serialize(user.messages);
        if (req.format === 'HTML') {
            res.render('messageSingle', { messages: user.messages});
        } else {
        res.status(200).send(jsonapi);
        }
    })
  };