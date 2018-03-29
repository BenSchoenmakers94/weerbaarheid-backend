function checkIfJson(req, res, next) {
    req.isJSON = true;
    var contentType = req.headers['Content-Type'];
    if (!contentType === 'application/json') {
        req.isJSON = false;
    }
    next();
}

module.exports = checkIfJson;