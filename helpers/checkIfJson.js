function checkIfJson(req, res, next) {
    if (!req.get('Content-Type' === 'application/json')) {
        res.render("TODO");
        return;
    }
    next();
}

module.exports = checkIfJson;