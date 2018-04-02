var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    subject: { type: String, required: true, maxlength: [25, "the maximum amount of characters for the subject is 25"] },
    content: { type: String, required: true, maxlength: [255, "the maximum amount of characters for the message is 255"] },
    urgent: { type: Boolean },
    postedAt: { type: Date, default: Date.now, set: function(value) { return this.postedAt } },
    sender: { type: String, default: "Punt Weerbaarheid" }
});


module.exports = mongoose.model('Message', messageSchema);