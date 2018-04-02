var Message = require('../../models/message');
var ResourceSerializer = require('../../serializers/resourceSerializer');

module.exports = (req, res) => {
    const message = req.object;

    var jsonApi = ResourceSerializer.serialize('Message', message);
    if (req.format === 'HTML') {
        res.render('messageSingle', { messages: [message]});
    } else {
    res.status(200).send(jsonapi);
    }
}