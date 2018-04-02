var request = require('request-json');

function getExternalData() {
    return new Promise(function(resolve, reject) {
        var external = {};
        var api = {};
        api.globalURL = "https://ipinfo.io/json";

        var client = request.createClient(api.globalURL);
        client.get('', function(err, results, body) {
        if (err) { reject(console.error(err)) }
        external['Connecting from'] = { 
            'IP': body['ip'],
            'Region': body['region'],
            'Country': body['country']}
            resolve(external);
        });
    });
}

module.exports = getExternalData;