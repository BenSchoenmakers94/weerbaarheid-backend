module.exports = {
    type: 'users',

    structure: function(opts = {}) {
        return Object.assign(opts, {
            attributes: [
                'firstName',
                'lastName',
                'birthDate',
                'postalCode',
                'houseNumber',
                'email',
                'messages'
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
    }
}