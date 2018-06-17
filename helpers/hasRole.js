var Group = require('../models/group');

function hasRole (req, res, next) {
    Group.findOne({ 'users': { _id: req.currentUserId }}, function(err, group) {
        if (err) {
            return res.status(404).send("No group was assigned to the specified user." + err);
        }
        if (!group || !(group._id === 'Administrator')) {
            return res.status(403).send("Only users in the Administrator group have access.");
        }
        next();
    });
}

module.exports = hasRole;
