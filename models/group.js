var mongoose = require('mongoose');

var groupSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    users: [{ type: mongoose.Schema.Types.String, ref: 'User' }]
});

module.exports = mongoose.model('Group', groupSchema);