var User = require('../../models/user');
var UserSerializer = require('../../serializers/userSerializer');

module.exports = (req, res) => {
    const user = req.object;

    var jsonApi = UserSerializer.serialize(user);
    res.status(200).send(jsonApi);
}