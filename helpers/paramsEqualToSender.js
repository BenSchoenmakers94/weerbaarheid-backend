function paramsEqualToSender(req, res, next) {
    if (new RegExp('^'+ req.params.userId + '$', "i").test(req.payload.id)) {
        console.log(req.params.userId);
        console.log(req.object._id);
        next();
    } else{
        return res.status(403).send("The object in the URL is not equal to the object in the data.")
    }
}

module.exports = paramsEqualToSender;