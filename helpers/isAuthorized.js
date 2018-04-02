function isAuthorized(req, res, next) {
    if (!(new RegExp('^' + req.userId + '$', 'i').test(req.object._id))) {
        return res.status(403).send("You are not authorized to modify the data.");
    }

    next();
}

module.exports = isAuthorized;