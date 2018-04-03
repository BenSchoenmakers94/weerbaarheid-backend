var User = require('../../models/user');
var ResourceSerializer = require('../../serializers/resourceSerializer');

module.exports = (req, res) => {
    User.findById(req.object._id, req.fields)
    .populate('messages')
    .exec(function(err, user) {
        if (err) {
            return res.status(500).send("There was a problem finding the list of users.");
        }
        if (!user) {
            return res.status(404).send("No users found.");
        }


        if (req.format === 'HTML') {
            res.render('userSingle', { users: [user]});
        } else {
            var jsonApi = ResourceSerializer.serialize('User', user);
            res.status(200).send(jsonApi);
        }
    });
}