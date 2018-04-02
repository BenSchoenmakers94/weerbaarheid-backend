var User = require('../../../models/user');
var Group = require('../../../models/group');
var GroupSerializer = require('../../../serializers/groupSerializer');

module.exports = (req, res) => {
    User.findById(new RegExp('^'+ req.params.userId + '$', "i"), function(err, user) {
        if (err) {
            return res.status(500).send("There is something wrong with the server.");
        }
        if (!user) {
            return res.status(404).send("No user found with ID.");
        }
        
       Group.findByIdAndUpdate(
           req.object._id,
           { $pull: { users: new RegExp('^'+ req.params.userId + '$', "i")}},
           { new: true })
           .populate('users')
           .exec(function(err, group) {
            var jsonapi = GroupSerializer.serialize(group);
            return res.status(200).send(jsonapi);
            });  
    });
}