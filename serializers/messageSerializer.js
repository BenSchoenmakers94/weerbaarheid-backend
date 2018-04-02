module.exports = {
    type: 'messages',

    structure: function(opts = {}) {
        return Object.assign(opts, {
            attributes: [
                'subject',
                'content',
                'postedAt',
                'urgent'
            ]
        })
    }
}