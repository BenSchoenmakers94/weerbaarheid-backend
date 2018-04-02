var Message = require('../models/message');
var User = require('../models/user');


function addMessageToUser(res, messageId, userId) {
    var promise = new Promise(function(resolve, reject) {
        User.findById(userId, function(err, user) {
            if (err) {
                reject(res.stats(422).send("There was a problem with modifying the user."));
            }
            if (!user) {
                reject(res.status(404).send("The proposed user does not exist"));
            }
        })
        User.findByIdAndUpdate(
            userId,
            { $addToSet: { messages: messageId }},
            { new: true, runValidators: true },
            function(err, user) {
                if (err) {
                    reject(res.stats(422).send("There was a problem with modifying the user."));
                }
                resolve(user);
        });
    });
    return promise;
}

module.exports = addMessageToUser;