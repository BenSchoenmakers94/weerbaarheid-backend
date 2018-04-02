var User = require('../../models/user');
var ResourceSerializer = require('../../serializers/resourceSerializer');

module.exports = (req, res) => {
    const user = req.object;
    User.findById(user._id, req.fields)
    .populate('messages')
    .exec(function(err, user) {
        if (err) {
            return res.status(500).send("There was a problem finding the list of users.");
        }
        if (!users) {
            return res.status(404).send("No users found.");
        }

        var jsonApi = ResourceSerializer.serialize('User', users);
        if (req.format === 'HTML') {
            res.render('userSingle', { users: [user]});
        } else {
        res.status(200).send(jsonapi);
        }
    });
}