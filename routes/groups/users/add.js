var User = require('../../../models/user');
var Group = require('../../../models/group');
var addUserToGroup = require('../../../helpers/addUserToGroup');
var ResourceSerializer = require('../../../serializers/resourceSerializer');

module.exports = (req, res) => {
    User.findById(new RegExp('^'+ req.params.userId + '$', "i"), function(err, user) {
        if (err) {
            return res.status(500).send("There is something wrong with the server.");
        }
        if (!user) {
            return res.status(404).send("No user found with ID.");
        }
        
        addUserToGroup(res, user._id, req.object._id).then(function(group) {
            Group.findById(req.object._id)
            .populate('users')
            .exec(function(err, popGroup) {
            var jsonApi = ResourceSerializer.serialize('User', user);
            return res.status(201).send(jsonApi);
            });
        }, function(error){});
    });
}