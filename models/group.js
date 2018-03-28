var mongoose = require('mongoose');

var groupSchema = new mongoose.Schema({
    groupName: { type: String, required: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

mongoose.model('Group', groupSchema);