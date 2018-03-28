var JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = new JSONAPISerializer('groups', {
    attributes: [
        'groupName',
    ]
});