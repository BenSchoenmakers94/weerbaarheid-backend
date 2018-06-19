var Group = require('../models/group');
var User = require('../models/user');

function addUserToGroup(res, userId, groupId) {
    return new Promise(function(resolve, reject) {
        User.findById(userId, function(err, user) {
            if(err) {
                return resolve({success: false, code: 500, content: 'error occured'});
            }
            if (!user) {
                return resolve({success: false, code: 404, content: 'user not found'});
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
                 return resolve({success: false, code: 500, content: 'error occured'});
               }

              Group.findByIdAndUpdate({ _id: groupId },
                   {$addToSet: { users: userId }},
                   { new: true, runValidator: true },
                   function(err, group) {
                  if (err) {
                       return resolve({success: false, code: 500, content: 'error occured'});
                  }
                  return resolve({success: true, code: 200, content: group});
              });
            }
        );

    });
}

module.exports = addUserToGroup;
