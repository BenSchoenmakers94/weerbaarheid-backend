var Group = require('../../../models/group');
var User = require('../../../models/user');
var ResourceSerializer = require('../../../serializers/resourceSerializer');

module.exports = (req, res) => {
    Group.findById(req.object._id)
    .populate('users', req.fields, User, req.where, req.options)
    .exec(function(err, group) {
        User.find({
            '_id': { $in: group.users }
        })
        .populate('messages')
        .exec(function(err, users) {
            var jsonapi = ResourceSerializer.serialize('User', users, { meta: { pagination: req.options, filter: req.where } });
            res.status(200).send(jsonapi);
        });
    })
  };