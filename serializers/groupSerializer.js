var JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = new JSONAPISerializer('groups', {
    attributes: [
        'users',
    ],
    users: {
        ref: '_id',
        included: true,
        attributes: [
            'firstName',
            'lastName',
            'birthDate',
            'postalCode',
            'houseNumber',
            'email',
        ]
    }
});