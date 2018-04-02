var Group = require('../../models/group');
var GroupSerializer = require('../../serializers/groupSerializer');

module.exports = (req, res) => {
    Group.find(req.where, req.fields, req.options)
    .populate('users')
    .exec(function(err, groups) {
        if (err) {
            return res.status(500).send("There was a problem finding the list of groups");
        }

        var jsonApi = GroupSerializer.serialize(groups);
        res.status(200).send(jsonApi);
    }); 
}