var Group = require('../../../models/group');
var UserSerializer = require('../../../serializers/userSerializer');

module.exports = (req, res) => {
    Group.findById(req.object._id)
    .populate('users')
    .exec(function(err, group) {
        var jsonapi = UserSerializer.serialize(group.users);
        res.status(200).send(jsonapi);
    })
  };