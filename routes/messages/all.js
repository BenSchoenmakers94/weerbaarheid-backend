var Message = require('../../models/message');
var ResourceSerializer = require('../../serializers/resourceSerializer');

module.exports = (req, res) => {
    Message.find(req.where, req.fields, req.options, function(err, messages) {
        if (err) {
            return res.status(500).send("There was a problem finding the list of message.");
        }
        if (!messages) {
            return res.status(404).send("No messages found.");
        }

        var jsonApi = ResourceSerializer.serialize('Message', messages, { meta: { pagination: req.options, filters: req.where } });
        res.status(200).send(jsonApi);
    });
}