var Message = require('../models/message');
var User = require('../models/user');

function addMessageToUser(messageId, userId) {
    return new Promise((resolve) => {
        User.findById(userId, function(err, user) {
            if (err) {
                resolve({success: false, code: 500, content: err.message});
            }
            if (!user) {
                resolve({success: false, code: 404, content: 'user not found'});
            }
        })
        User.findByIdAndUpdate(
            userId,
            { $addToSet: { messages: messageId }},
            { new: true, runValidators: true },
            function(err, user) {
                if (err) {
                    resolve({success: false, code: 422, content: err.message});
                }
                resolve({success: true, code: 200, content: user});
        });
    });
}

module.exports = addMessageToUser;
