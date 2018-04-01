var JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = new JSONAPISerializer('users', {
    attributes: [
        'firstName',
        'lastName',
        'birthDate',
        'postalCode',
        'houseNumber',
        'email',
        'group'
    ],
    messages: {
        ref: '_id',
        included: true,
        attributes: [
            'subject',
            'content',
            'urgent',
            'postedAt'
        ]
    }
});