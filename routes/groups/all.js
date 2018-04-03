var Group = require('../../models/group');
var ResourceSerializer = require('../../serializers/resourceSerializer');

module.exports = (req, res) => {
    Group.find(req.where, req.fields, req.options)
    .populate('users')
    .exec(function(err, groups) {
        if (err) {
            return res.status(500).send("There was a problem finding the list of groups");
        }

        if (req.format === 'HTML') {
            res.render('groupSingle', { groups: groups});
        } else {
            var jsonApi = ResourceSerializer.serialize('Group', groups, { meta: { pagination: req.options, filters: req.where } });
            res.status(200).send(jsonApi);
        }
    }); 
}