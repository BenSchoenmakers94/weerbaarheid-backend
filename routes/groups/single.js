var Group = require('../../models/group');
var ResourceSerializer = require('../../serializers/resourceSerializer');

module.exports = (req, res) => {
    const group = req.object;

    Group.findById(req.object._id, req.fields)
    .populate('users')
    .exec(function(err, group) {
        if (err) {
            return res.status(500).send("There was a problem with retrieving the users in the group.");
        }
      
        var jsonApi = ResourceSerializer.serialize('Group', group);
        if (req.format === 'HTML') {
            res.render('groupSingle', { groups: [group]});
        } else {
        res.status(200).send(jsonapi);
        }
    });   
}