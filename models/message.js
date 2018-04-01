var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    content: { type: String, required: true },
    urgent: { type: Boolean },
    postedAt: { type: Date, default: Date.now, set: function(value) { return this.postedAt } }
});

messageSchema.path('content').validate(function(value) {
    return value.length <= 25;
}, "the maximum amount of characters for the subject is 25");

messageSchema.path('subject').validate(function(value) {
    return value.length <= 25;
}, "the maximum amount of characters for the subject is 25");

module.exports = mongoose.model('Message', messageSchema);