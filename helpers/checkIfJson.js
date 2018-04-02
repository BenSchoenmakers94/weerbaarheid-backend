function checkIfJson(req, res, next) {
    var response  = req.headers['accept'];
    if (new RegExp('text/html', 'i').test(response)) {
        req.format = 'HTML';
    }
    
    next();
}

module.exports = checkIfJson;