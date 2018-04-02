var Message = require('../models/message');
var User = require('../models/user');


function addMessageToUser(res, messageId, userId) {
    var promise = new Promise(function(resolve, reject) {
        User.findMessageInstanceWithUser(messageId, function(err, user) {
            if (err) {
                reject(res.stats(500).send("There is a problem with the server."));
            }
            if (user) {
                reject(res.status(422).send("The message you are trying to add already exists with a user."));
            }
        })
        Message.findById(messageId, function(err, message) {
            if (err) {
                reject(res.stats(500).send("There is a problem with the server."));
            }
            if (!message) {
                reject(res.status(404).send("The message you are trying to add does not exist on the database."));
            }
        });
        User.findByIdAndUpdate(
            userId,
            { $addToSet: { messages: messageId }},
            { new: true, runValidators: true },
            function(err, user) {
                if (err) {
                    reject(res.stats(422).send("There was a problem with modifying the user."));
                }
                if (!user) {
                    reject(res.status(404).send("The proposed user does not exist"));
                }
                resolve(user);
        });
    });
    return promise;
}

module.exports = addMessageToUser;