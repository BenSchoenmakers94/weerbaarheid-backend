module.exports = {
    type: 'groups',

    structure: (opts = {}) => {
        return Object.assign(opts, {
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
    }
}