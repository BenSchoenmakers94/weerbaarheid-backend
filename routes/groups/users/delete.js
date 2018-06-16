var User = require('../../../models/user');
var Group = require('../../../models/group');
var ResourceSerializer = require('../../../serializers/resourceSerializer');

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
            var jsonApi = ResourceSerializer.serialize('Group', group);
            return res.status(200).send(jsonApi);
            });  
    });
}
