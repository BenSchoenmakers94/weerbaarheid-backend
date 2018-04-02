var Group = require('../../../models/group');
var User = require('../../../models/user');
var UserSerializer = require('../../../serializers/userSerializer');

module.exports = (req, res) => {
    Group.findById(req.object._id)
    .populate('users')
    .exec(function(err, group) {
        User.find({
            '_id': { $in: group.users }
        })
        .populate('messages')
        .exec(function(err, users) {
            var jsonapi = UserSerializer.serialize(users);
            res.status(200).send(jsonapi);
        });
    })
  };