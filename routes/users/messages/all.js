var User = require('../../../models/user');
var ResourceSerializer = require('../../../serializers/resourceSerializer');
var Message = require('../../../models/message');

module.exports = (req, res) => {
    User.findById(req.object._id)
    .populate('messages', req.fields, Message, req.where, req.options)
    .exec(function(err, user) {
        var jsonapi = ResourceSerializer.serialize('Message', user.messages, { meta: { pagination: req.options, filter: req.where } });
        res.status(200).send(jsonapi);
    })
  };