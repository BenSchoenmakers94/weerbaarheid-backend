var bcrypt = require('bcryptjs');

var User = require('../../models/user');
var ResourceSerializer = require('../../serializers/resourceSerializer');


module.exports = (req, res) => {
    User.findByIdAndUpdate(
        req.object._id,
        {$set: req.attributes},
        { new: true, runValidators: true },
        function(err, user) {
            if (err) {
                return res.status(422).send(
                    "There was a problem with updating user " + req.params._id + ".\n Message: " + err
                );
            }

            var jsonapi = ResourceSerializer.serialize('User', user);
            return res.status(200).send(jsonapi);
        })
}