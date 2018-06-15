const User = require('../../models/user');

module.exports = (req, res) => {
    User.deleteOne({ _id: req.object._id }, function(err) {
        if (err) {
            return res.status(404).send("There exists no record of a user with id: " + req.object._id + ".");
        }
        return res.status(200).send();
    })
}
