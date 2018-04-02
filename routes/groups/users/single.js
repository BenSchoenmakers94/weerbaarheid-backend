var Group = require('../../../models/group');
var User = require('../../../models/user');
var ResourceSerializer = require('../../../serializers/resourceSerializer');

module.exports = (req, res) => {
    var foundObj = {};
    Group.findById(req.object._id)
    .populate('users')
    .exec(function(err, group) {
        if (err) {
            return res.status(500).send("There is something wrong with the server.");
        }
        User.findById(new RegExp('^'+ req.params.userId + '$', "i"), function(err, user) {
            if (err) {
                return res.status(500).send("There is something wrong with the server.");
            }
            if (!user) {
                return res.status(404).send("No user found with ID.");
            }

            group.users.forEach(userInGroup => {
                if (userInGroup._id === user._id) {
                    foundObj = user._id;
                }
            });

            if (foundObj) {
                User.findById(user._id, req.fields)
                .populate('messages')
                .exec(function(err, user) {
                     var jsonapi = ResourceSerializer.serialize('User', user);

                    if (req.format === 'HTML') {
                        res.render('userSingle', { users: [user]});
                    } else {
                    res.status(200).send(jsonapi);
                    }
                });
            } else {
                return res.status(404).send("No user found with provided ID in provided group.");
            }
        });
    });   
}