var bcrypt = require('bcryptjs');

var User = require('../../models/user');
var UserSerializer = require('../../serializers/userSerializer');


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

            var jsonapi = UserSerializer.serialize(user)
            return res.status(200).send(jsonapi);
        })
}