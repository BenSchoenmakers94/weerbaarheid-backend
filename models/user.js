var mongoose = require('mongoose');

console.log('Successful user initialization!');

var userSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    postalCode: { type: String, required: true },
    houseNumber: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group'}
});

userSchema.path('birthDate').validate(function(value) {
    return value && value < new Date();
});

userSchema.path('postalCode').validate(function(value) {
    var regex = RegExp('^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}', 'i');
    return regex.test(value);
});

userSchema.path('houseNumber').validate(function(value) {
    return value > 0;
});

mongoose.model('User', userSchema);

module.exports = mongoose.model('User');