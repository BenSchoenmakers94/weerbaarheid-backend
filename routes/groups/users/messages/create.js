var Message = require('../../../../models/message');
var addMessageToUser = require('../../../../helpers/addMessageToUser');
var MessageSerializer = require('../../../../serializers/messageSerializer');

module.exports = (req, res) => {
    req.attributes['_id'] = req.payload.id;
        
        Message.create(
            req.attributes,
            function(err, message) {
                if (err) {
                    return res.status(422).send(
                        err.message
                    );
                }

                addMessageToUser(res, req.payload.id, req.userId);
                var jsonApi = MessageSerializer.serialize(message);
                res.status(201).send(jsonApi);
            });
}