var User = require('../../models/user');
var UserSerializer = require('../../serializers/userSerializer');

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

        var jsonApi = UserSerializer.serialize(users);
        res.status(200).send(jsonApi)
    });
}