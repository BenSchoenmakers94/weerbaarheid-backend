var User = require('../../models/user');
var ResourceSerializer = require('../../serializers/resourceSerializer');

module.exports = (req, res) => {
    User.find(req.where, req.fields, req.options)
    .populate('messages')
    .exec(function(err, users) {
        if (err) {
            return res.status(500).send("There was a problem finding the list of users.");
        }
        if (!users) {
            return res.status(404).send("No users found.");
        }


        if (req.format === 'HTML') {
            res.render('userSingle', { users: users});
        } else {
            var jsonApi = ResourceSerializer.serialize('User', users, { meta: { pagination: req.options, filters: req.where } });
            res.status(200).send(jsonApi);
        }
    });
}