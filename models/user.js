var mongoose = require('mongoose');

console.log('Successful user initialization!');

var userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);