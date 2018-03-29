var mongoose = require('mongoose');

var groupSchema = new mongoose.Schema({
    groupName: { type: String, required: true, unique: true }
});

mongoose.model('Group', groupSchema);

module.exports = mongoose.model('Group');


//Functional ID on Groups
//Relationships + Populate
//Role-based authentication
//Notes
//