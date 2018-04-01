var Group = require('../models/group');
var User = require('../models/user');

function addUserToGroup(res, userId, groupId) {
    var promise = new Promise(function(resolve, reject) {
        User.findById(userId, function(err, user) {
            if (!user) {
                reject(res.status(404).send("The proposed user does not exist"));
            }
        });
        Group.update(
            { },
            { $pull: {
                users: userId
            }},
            { multi: true },
            function(err, groups) {
               if (err) {
                reject(res.status(500).send("There is a problem with the server."));
               }
            }
        );
    
        Group.findByIdAndUpdate({ _id: groupId },
             {$addToSet: {
                users: userId
             }},
             function(err, group) {
            if (err) {
                reject(res.status(500).send("There is a problem with the server."));
            }
            resolve(group);
        });
    });
    return promise;
}

module.exports = addUserToGroup;