function isAuthorized(req, res, next) {
    if (!(new RegExp('^' + req.userId + '$', 'i').test(req.params.userId))) {
        return res.status(403).send("You are not authorized to access the data.");
    }
    next();
}

module.exports = isAuthorized;
