var Message = require('../../models/message');
var ResourceSerializer = require('../../serializers/resourceSerializer');

module.exports = (req, res) => {
    const message = req.object;

    if (req.format === 'HTML') {
        res.render('messageSingle', { messages: [message]});
    } else {
        var jsonApi = ResourceSerializer.serialize('Message', message);
        res.status(200).send(jsonApi);
    }
}