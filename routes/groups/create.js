var Group = require('../../models/group')
var ResourceSerializer = require('../../serializers/resourceSerializer')

module.exports = (req, res) => {
  req.attributes['_id'] = req.payload.id;

  Group.create(req.attributes, (err, group) => {
    if(err) {
      return res.status(422).send(err.message);
    }

    var jsonApi = ResourceSerializer.serialize('Group', group);
    res.status(201).send(jsonApi);
  });
}
