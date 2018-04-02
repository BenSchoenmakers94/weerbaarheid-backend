var bcrypt = require('bcryptjs');

var User = require('../../../models/user');
var addUserToGroup = require('../../../helpers/addUserToGroup');
var ResourceSerializer = require('../../../serializers/resourceSerializer');

module.exports = (req, res) => {
    var hashedPassword = bcrypt.hashSync(req.payload.password, 8);
    req.attributes['_id'] = req.payload.id;
    req.attributes['password'] = hashedPassword;
        
        User.create(
            req.attributes,
            function(err, user) {
                if (err) {
                    return res.status(422).send(
                        err.message
                    );
                }

                addUserToGroup(res, req.payload.id, req.object._id);
                var jsonApi = ResourceSerializer.serialize('User', user);
                res.status(201).send(jsonApi);
            });
}