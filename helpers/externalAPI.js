var request = require('request-json');

function getExternalData() {
    return new Promise(function(resolve, reject) {
        var globalURL = "http://quotes.rest/qod.json";
        var client = request.createClient(globalURL);

        client.get('', function(err, results, body) {
          if (err) { reject(console.error(err)) }
          resolve({
            subject: 'Quote of the Day',
            content: body.contents.quotes[0].quote,
            urgent: true
          });
        });
    });
}

module.exports = getExternalData
