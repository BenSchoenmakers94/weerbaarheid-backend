function paramsEqualToSender(req, res, next) {
    if (req.payload.id == undefined
          ||  new RegExp('^'+ req.params.userId + '$', "i").test(req.payload.id)) {
        next();
    } else{
        return res.status(403).send("The object in the URL is not equal to the object in the data.")
    }
}

module.exports = paramsEqualToSender;
