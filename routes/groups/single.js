var Group = require('../../models/group');
var GroupSerializer = require('../../serializers/groupSerializer');

module.exports = (req, res) => {
    const group = req.object;

    Group.findById(req.object._id)
    .populate('users')
    .exec(function(err, group) {
        if (err) {
            return res.status(500).send("There was a problem with retrieving the users in the group.");
        }
        var jsonApi = GroupSerializer.serialize(group);
        res.status(200).send(jsonApi);
    })
    
}