var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    postalCode: { type: String, required: true },
    houseNumber: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]
});

userSchema.path('birthDate').validate(function(value) {
    return value && value < new Date();
}, "Birthdate must be set before the current date.");

userSchema.path('postalCode').validate(function(value) {
    var regex = RegExp('^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}', 'i');
    return regex.test(value);
}, "A valid postal code must be entered --> 0000 XX.");

userSchema.path('houseNumber').validate(function(value) {
    return value > 0;
}, "A housenumber higher than 0 must be entered.");

userSchema.statics.getUsersWithSameLastName = function(lastName, callback) {
    var usersWithSameLastName = [];
    this.find({ 'lastName': lastName }, function(err, users) {
        if (err) {
            callback(err);
        } else {
        users.forEach(user => {
            usersWithSameLastName.push(user);
        });
        callback(usersWithSameLastName);
    }
    });
}

userSchema.statics.findMessageInstanceWithUsers = function(messageId, callback) {
    return this.model('User').find({ 'message': { _id: messageId } }, callback);
}

mongoose.model('User', userSchema);

module.exports = mongoose.model('User');