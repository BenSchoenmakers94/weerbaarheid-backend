var Group = require('../models/group');
var User = require('../models/user');

function addUserToGroup(res, userId, groupId) {
    var promise = new Promise(function(resolve, reject) {
        User.findById(userId, function(err, user) {
            if(err) {
                resolve({success: false, code: 500, content: 'error occured'});
            }
            if (!user) {
                resolve({success: false, code: 404, content: 'user not found'});
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
                 resolve({success: false, code: 500, content: 'error occured'});
               }
            }
        );

        Group.findByIdAndUpdate({ _id: groupId },
             {$addToSet: {
                users: userId
             }},
             { new: true, runValidator: true },
             function(err, group) {
            if (err) {
                 resolve({success: false, code: 500, content: 'error occured'});
            }
            resolve({success: true, code: 200, content: group});
        });
    });
    return promise;
}

module.exports = addUserToGroup;
