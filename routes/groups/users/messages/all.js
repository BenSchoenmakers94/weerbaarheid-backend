var User = require('../../../../models/user');
var Message = require('../../../../models/message');
var ResourceSerializer = require('../../../../serializers/resourceSerializer');

module.exports = (req, res) => {
    User.findById(req.userId, function(err, user) {
        if (err) {
            return res.status(500).send("There was a problem with the server.");
        }
        if (!user) {
            return res.status(404).send("User does not exist in group.");
        }
    })
    .populate('messages', req.fields, Message, req.where, req.options)
    .exec(function(err, user) {
        var jsonapi = ResourceSerializer.serialize('Message', user.messages, { meta: { pagination: req.options, filter: req.where } });
        res.status(200).send(jsonapi);
    })
  };