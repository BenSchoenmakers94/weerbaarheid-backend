var mongoose = require('mongoose');

var groupSchema = new mongoose.Schema({
    groupName: { type: String, required: true }
});

mongoose.model('Group', groupSchema);

module.exports = mongoose.model('Group');