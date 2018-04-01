var JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = new JSONAPISerializer('messages', {
    attributes: [
        'subject',
        'content',
        'postedAt',
        'urgent'
    ]
});