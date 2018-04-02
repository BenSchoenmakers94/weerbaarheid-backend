const User = require('../../models/user');

module.exports = (req, res) => {
    User.deleteOne({ _id: req.object._id }, function(err) {
        if (err) {
            res.status(404).send("There exists no record of a user with id: " + req.object._id + ".");
        }
    })
}