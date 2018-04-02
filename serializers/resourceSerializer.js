var JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports =  {
    serialize: function(type, data, opts) {
        var serializer = require('./' + type + 'Serializer');
        return new JSONAPISerializer(serializer.type, data, serializer.structure(opts));
    }
}